import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Doc = GetTypeByName<typeof configuration, "docs">;
export declare const allDocs: Array<Doc>;

export type Meta = GetTypeByName<typeof configuration, "meta">;
export declare const allMetas: Array<Meta>;

export type Post = GetTypeByName<typeof configuration, "posts">;
export declare const allPosts: Array<Post>;

export type PostMeta = GetTypeByName<typeof configuration, "postMetas">;
export declare const allPostMetas: Array<PostMeta>;

export type Author = GetTypeByName<typeof configuration, "authors">;
export declare const allAuthors: Array<Author>;

export type Question = GetTypeByName<typeof configuration, "questions">;
export declare const allQuestions: Array<Question>;

export {};
