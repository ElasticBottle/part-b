// content-collections.ts
import {
  defineCollection,
  defineConfig
} from "@content-collections/core";
import { transformMDX } from "@fumadocs/content-collections/configuration";
import { remarkNpm } from "fumadocs-core/mdx-plugins";
import { createGenerator, remarkAutoTypeTable } from "fumadocs-typescript";
import rehypeExternalLinks from "rehype-external-links";

// src/lib/markdown/get-reading-time.ts
import getReadingTime from "reading-time";
function getContentReadingTime({
  content,
  wordsPerMinute = 200
}) {
  const readingTime = getReadingTime(content, {
    wordsPerMinute
  });
  return readingTime;
}

// src/lib/markdown/get-timestamps.ts
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
var resolveFilepath = (candidate) => {
  if (!candidate) return null;
  if (existsSync(candidate)) return candidate;
  try {
    const out = execSync(`git ls-files "../**/*/${candidate}"`, {
      stdio: ["ignore", "pipe", "ignore"]
    });
    const matches = out.toString().split("\n").map((s) => s.trim()).filter((s) => s.length > 0);
    const preferred = matches.find((m) => m.endsWith(candidate));
    return preferred ?? matches[0] ?? null;
  } catch {
    return null;
  }
};
function getTimestamps({ filepath }) {
  const resolvedFilePath = resolveFilepath(filepath);
  if (!resolvedFilePath) return null;
  try {
    const lastModified = execSync(
      `git log -1 --pretty="format:%cI" "${resolvedFilePath}"`,
      {
        stdio: ["ignore", "pipe", "ignore"]
      }
    );
    const createdAt = execSync(
      `git log --follow --pretty="format:%aI" --reverse "${resolvedFilePath}" | head -1`,
      {
        stdio: ["ignore", "pipe", "ignore"]
      }
    );
    const lastModifiedIso = lastModified.toString().trim();
    const createdAtIso = createdAt.toString().trim();
    return { lastModified: lastModifiedIso, createdAt: createdAtIso };
  } catch {
    return null;
  }
}

// src/lib/schema.ts
import { type } from "arktype";
var DocSchema = type({
  title: "string",
  "description?": "string",
  "icon?": "string",
  "full?": "boolean",
  // TODO: add openapi thingy
  // "_openapi?": "Record<string, any>",
  // self defined
  "author?": "string"
});
var PostSchema = type({
  "...": DocSchema,
  // blog-specific
  "cover?": "string",
  tags: type("string").array().default(() => [])
});
var AuthorSchema = type({
  name: "string",
  image: "string"
});
var MetaSchema = type({
  "title?": "string",
  "description?": "string",
  "icon?": "string",
  "pages?": "string[]",
  "root?": "boolean",
  "defaultOpen?": "boolean"
});
var QuestionSchema = type({
  slug: "string",
  type: "'mcq'",
  question: "string",
  options: type("string").array().default(() => []),
  answer: "number"
});

// content-collections.ts
var generator = createGenerator();
var mdxTransformer = async (document, context) => {
  const readingTime = getContentReadingTime({
    content: document.content
  });
  const timestamps = getTimestamps({ filepath: document._meta.filePath });
  const mdx = await transformMDX(document, context, {
    remarkPlugins: [
      [remarkAutoTypeTable, { generator }],
      [remarkNpm, { persist: { id: "package-manager" } }]
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
          content: { type: "text", value: " \u{1F517}" }
        }
      ]
    ]
  });
  let authorDetail = null;
  if ("author" in mdx && typeof mdx.author === "string") {
    const author = context.documents(authors).find((author2) => {
      if (author2._meta.path === mdx.author) {
        authorDetail = author2;
        return true;
      }
      return false;
    });
    if (author) {
      authorDetail = { name: author.name, image: author.image };
    } else {
      authorDetail = { name: mdx.author };
    }
  }
  return {
    ...mdx,
    readingTime: readingTime.text,
    ...timestamps,
    authorDetail
  };
};
var docs = defineCollection({
  name: "docs",
  directory: "../",
  include: "**/docs/**/*.mdx",
  exclude: "**/node_modules/**",
  schema: DocSchema,
  transform: async (document, context) => mdxTransformer(document, context)
});
var posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.mdx",
  schema: PostSchema,
  transform: (document, context) => mdxTransformer(document, context)
});
var metas = defineCollection({
  name: "meta",
  directory: "../",
  include: "**/docs/**/meta.json",
  exclude: "**/node_modles/**",
  parser: "json",
  schema: MetaSchema
});
var postMetas = defineCollection({
  name: "postMetas",
  directory: "posts",
  include: "**/meta.json",
  parser: "json",
  schema: MetaSchema
});
var authors = defineCollection({
  name: "authors",
  directory: "authors",
  include: "*.json",
  parser: "json",
  schema: AuthorSchema
});
var questions = defineCollection({
  name: "questions",
  directory: "questions",
  include: "*.json",
  parser: "json",
  schema: QuestionSchema
});
var content_collections_default = defineConfig({
  collections: [docs, metas, posts, postMetas, authors, questions]
});
export {
  content_collections_default as default
};
