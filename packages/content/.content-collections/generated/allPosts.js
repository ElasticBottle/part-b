
export default [
  {
    "title": "Drizzle ORM + PostgreSQL in a Turborepo",
    "description": "Type-safe queries, fast DX, and shared types across packages.",
    "icon": "Database",
    "cover": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    "author": "winston",
    "content": "<Callout type=\"note\">\nMonorepos shine when database types are shared between API and UI packages.\n</Callout>\n\n## Setup outline\n\n- Define schema in a `packages/db` workspace using Drizzle.\n- Generate types and export a `createDb` factory.\n- Consume from `packages/api` and keep Zod/ArkType schemas in sync.\n\n## Migrations\n\nUse Drizzle Kit to generate and apply migrations, and wire scripts via your root workspace.\n\n## References\n\n<Cards>\n  <Card title=\"Drizzle ORM\" href=\"https://orm.drizzle.team\">\n    Lightweight TypeScript ORM with first-class SQL.\n  </Card>\n  <Card title=\"PostgreSQL Docs\" href=\"https://www.postgresql.org/docs/\">\n    Official PostgreSQL documentation and guides.\n  </Card>\n  <Card title=\"Turborepo Handbook\" href=\"https://turbo.build/repo/docs\">\n    Patterns for multi-package, cached builds.\n  </Card>\n</Cards>",
    "tags": [],
    "_meta": {
      "filePath": "drizzle-postgres-turborepo.mdx",
      "fileName": "drizzle-postgres-turborepo.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "drizzle-postgres-turborepo"
    },
    "toc": [
      {
        "title": "Setup outline",
        "url": "#setup-outline",
        "depth": 2
      },
      {
        "title": "Migrations",
        "url": "#migrations",
        "depth": 2
      },
      {
        "title": "References",
        "url": "#references",
        "depth": 2
      }
    ],
    "structuredData": {
      "contents": [
        {
          "content": "type: note"
        },
        {
          "content": "Monorepos shine when database types are shared between API and UI packages."
        },
        {
          "heading": "setup-outline",
          "content": "Define schema in a packages/db workspace using Drizzle."
        },
        {
          "heading": "setup-outline",
          "content": "Generate types and export a createDb factory."
        },
        {
          "heading": "setup-outline",
          "content": "Consume from packages/api and keep Zod/ArkType schemas in sync."
        },
        {
          "heading": "migrations",
          "content": "Use Drizzle Kit to generate and apply migrations, and wire scripts via your root workspace."
        },
        {
          "heading": "references",
          "content": "Lightweight TypeScript ORM with first-class SQL."
        },
        {
          "heading": "references",
          "content": "Official PostgreSQL documentation and guides."
        },
        {
          "heading": "references",
          "content": "Patterns for multi-package, cached builds."
        }
      ],
      "headings": [
        {
          "id": "setup-outline",
          "content": "Setup outline"
        },
        {
          "id": "migrations",
          "content": "Migrations"
        },
        {
          "id": "references",
          "content": "References"
        }
      ]
    },
    "body": "var Component=(()=>{var u=Object.create;var c=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var g=Object.getPrototypeOf,w=Object.prototype.hasOwnProperty;var y=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),b=(r,e)=>{for(var t in e)c(r,t,{get:e[t],enumerable:!0})},d=(r,e,t,o)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let i of m(e))!w.call(r,i)&&i!==t&&c(r,i,{get:()=>e[i],enumerable:!(o=f(e,i))||o.enumerable});return r};var x=(r,e,t)=>(t=r!=null?u(g(r)):{},d(e||!r||!r.__esModule?c(t,\"default\",{value:r,enumerable:!0}):t,r)),k=r=>d(c({},\"__esModule\",{value:!0}),r);var l=y((D,a)=>{a.exports=_jsx_runtime});var C={};b(C,{default:()=>p});var n=x(l());function h(r){let e={code:\"code\",h2:\"h2\",li:\"li\",p:\"p\",ul:\"ul\",...r.components},{Callout:t,Card:o,Cards:i}=e;return t||s(\"Callout\",!0),o||s(\"Card\",!0),i||s(\"Cards\",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t,{type:\"note\",children:(0,n.jsx)(e.p,{children:\"Monorepos shine when database types are shared between API and UI packages.\"})}),`\n`,(0,n.jsx)(e.h2,{id:\"setup-outline\",children:\"Setup outline\"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsxs)(e.li,{children:[\"Define schema in a \",(0,n.jsx)(e.code,{children:\"packages/db\"}),\" workspace using Drizzle.\"]}),`\n`,(0,n.jsxs)(e.li,{children:[\"Generate types and export a \",(0,n.jsx)(e.code,{children:\"createDb\"}),\" factory.\"]}),`\n`,(0,n.jsxs)(e.li,{children:[\"Consume from \",(0,n.jsx)(e.code,{children:\"packages/api\"}),\" and keep Zod/ArkType schemas in sync.\"]}),`\n`]}),`\n`,(0,n.jsx)(e.h2,{id:\"migrations\",children:\"Migrations\"}),`\n`,(0,n.jsx)(e.p,{children:\"Use Drizzle Kit to generate and apply migrations, and wire scripts via your root workspace.\"}),`\n`,(0,n.jsx)(e.h2,{id:\"references\",children:\"References\"}),`\n`,(0,n.jsxs)(i,{children:[(0,n.jsx)(o,{title:\"Drizzle ORM\",href:\"https://orm.drizzle.team\",children:(0,n.jsx)(e.p,{children:\"Lightweight TypeScript ORM with first-class SQL.\"})}),(0,n.jsx)(o,{title:\"PostgreSQL Docs\",href:\"https://www.postgresql.org/docs/\",children:(0,n.jsx)(e.p,{children:\"Official PostgreSQL documentation and guides.\"})}),(0,n.jsx)(o,{title:\"Turborepo Handbook\",href:\"https://turbo.build/repo/docs\",children:(0,n.jsx)(e.p,{children:\"Patterns for multi-package, cached builds.\"})})]})]})}function p(r={}){let{wrapper:e}=r.components||{};return e?(0,n.jsx)(e,{...r,children:(0,n.jsx)(h,{...r})}):h(r)}function s(r,e){throw new Error(\"Expected \"+(e?\"component\":\"object\")+\" `\"+r+\"` to be defined: you likely forgot to import, pass, or provide it.\")}return k(C);})();\n;return Component;",
    "readingTime": "1 min read",
    "authorDetail": {
      "name": "Winston Yeo",
      "image": "https://avatars.githubusercontent.com/u/44563205?v=4&size=64"
    }
  },
  {
    "title": "Passkeys and WebAuthn: A 10-Minute Quickstart",
    "description": "Use platform authenticators to sign in without passwords using WebAuthn.",
    "icon": "Key",
    "cover": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    "content": "<Callout type=\"info\">\nPasskeys remove passwords from your auth flow using public-key cryptography powered by WebAuthn.\n</Callout>\n\nPasskeys are discoverable credentials stored by the OS and synced across devices. They bind authentication to the device and user presence (biometrics or PIN), improving both security and UX.\n\n## What you need to know\n\n- Registration creates a key pair. The private key never leaves the device.\n- Authentication proves possession of the private key with a signed challenge.\n- Relying parties (your app) validate the signature with the public key.\n\n## Implementation steps\n\n1. Feature-detect WebAuthn and platform authenticator availability.\n2. On signup, call `navigator.credentials.create` with a `publicKey` challenge from your server.\n3. Persist the credential ID and public key on your server.\n4. On login, call `navigator.credentials.get` with a server-issued challenge and verify the assertion.\n\n## Resources\n\n<Cards>\n  <Card title=\"MDN: Web Authentication API\" href=\"https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API\">\n    Overview of WebAuthn APIs in the browser.\n  </Card>\n  <Card title=\"Passkeys.dev\" href=\"https://passkeys.dev\">\n    Deep-dive into passkeys with patterns and UX guidance.\n  </Card>\n  <Card title=\"W3C WebAuthn Spec\" href=\"https://w3c.github.io/webauthn/\">\n    Canonical specification for registration and authentication ceremonies.\n  </Card>\n</Cards>",
    "tags": [],
    "_meta": {
      "filePath": "passkeys-webauthn-quickstart.mdx",
      "fileName": "passkeys-webauthn-quickstart.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "passkeys-webauthn-quickstart"
    },
    "toc": [
      {
        "title": "What you need to know",
        "url": "#what-you-need-to-know",
        "depth": 2
      },
      {
        "title": "Implementation steps",
        "url": "#implementation-steps",
        "depth": 2
      },
      {
        "title": "Resources",
        "url": "#resources",
        "depth": 2
      }
    ],
    "structuredData": {
      "contents": [
        {
          "content": "type: info"
        },
        {
          "content": "Passkeys remove passwords from your auth flow using public-key cryptography powered by WebAuthn."
        },
        {
          "content": "Passkeys are discoverable credentials stored by the OS and synced across devices. They bind authentication to the device and user presence (biometrics or PIN), improving both security and UX."
        },
        {
          "heading": "what-you-need-to-know",
          "content": "Registration creates a key pair. The private key never leaves the device."
        },
        {
          "heading": "what-you-need-to-know",
          "content": "Authentication proves possession of the private key with a signed challenge."
        },
        {
          "heading": "what-you-need-to-know",
          "content": "Relying parties (your app) validate the signature with the public key."
        },
        {
          "heading": "implementation-steps",
          "content": "Feature-detect WebAuthn and platform authenticator availability."
        },
        {
          "heading": "implementation-steps",
          "content": "On signup, call navigator.credentials.create with a publicKey challenge from your server."
        },
        {
          "heading": "implementation-steps",
          "content": "Persist the credential ID and public key on your server."
        },
        {
          "heading": "implementation-steps",
          "content": "On login, call navigator.credentials.get with a server-issued challenge and verify the assertion."
        },
        {
          "heading": "resources",
          "content": "Overview of WebAuthn APIs in the browser."
        },
        {
          "heading": "resources",
          "content": "Deep-dive into passkeys with patterns and UX guidance."
        },
        {
          "heading": "resources",
          "content": "Canonical specification for registration and authentication ceremonies."
        }
      ],
      "headings": [
        {
          "id": "what-you-need-to-know",
          "content": "What you need to know"
        },
        {
          "id": "implementation-steps",
          "content": "Implementation steps"
        },
        {
          "id": "resources",
          "content": "Resources"
        }
      ]
    },
    "body": "var Component=(()=>{var p=Object.create;var a=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var f=Object.getPrototypeOf,b=Object.prototype.hasOwnProperty;var g=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),m=(t,e)=>{for(var i in e)a(t,i,{get:e[i],enumerable:!0})},c=(t,e,i,o)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let r of v(e))!b.call(t,r)&&r!==i&&a(t,r,{get:()=>e[r],enumerable:!(o=y(e,r))||o.enumerable});return t};var w=(t,e,i)=>(i=t!=null?p(f(t)):{},c(e||!t||!t.__esModule?a(i,\"default\",{value:t,enumerable:!0}):i,t)),k=t=>c(a({},\"__esModule\",{value:!0}),t);var d=g((C,l)=>{l.exports=_jsx_runtime});var A={};m(A,{default:()=>u});var n=w(d());function h(t){let e={code:\"code\",h2:\"h2\",li:\"li\",ol:\"ol\",p:\"p\",ul:\"ul\",...t.components},{Callout:i,Card:o,Cards:r}=e;return i||s(\"Callout\",!0),o||s(\"Card\",!0),r||s(\"Cards\",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{type:\"info\",children:(0,n.jsx)(e.p,{children:\"Passkeys remove passwords from your auth flow using public-key cryptography powered by WebAuthn.\"})}),`\n`,(0,n.jsx)(e.p,{children:\"Passkeys are discoverable credentials stored by the OS and synced across devices. They bind authentication to the device and user presence (biometrics or PIN), improving both security and UX.\"}),`\n`,(0,n.jsx)(e.h2,{id:\"what-you-need-to-know\",children:\"What you need to know\"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:\"Registration creates a key pair. The private key never leaves the device.\"}),`\n`,(0,n.jsx)(e.li,{children:\"Authentication proves possession of the private key with a signed challenge.\"}),`\n`,(0,n.jsx)(e.li,{children:\"Relying parties (your app) validate the signature with the public key.\"}),`\n`]}),`\n`,(0,n.jsx)(e.h2,{id:\"implementation-steps\",children:\"Implementation steps\"}),`\n`,(0,n.jsxs)(e.ol,{children:[`\n`,(0,n.jsx)(e.li,{children:\"Feature-detect WebAuthn and platform authenticator availability.\"}),`\n`,(0,n.jsxs)(e.li,{children:[\"On signup, call \",(0,n.jsx)(e.code,{children:\"navigator.credentials.create\"}),\" with a \",(0,n.jsx)(e.code,{children:\"publicKey\"}),\" challenge from your server.\"]}),`\n`,(0,n.jsx)(e.li,{children:\"Persist the credential ID and public key on your server.\"}),`\n`,(0,n.jsxs)(e.li,{children:[\"On login, call \",(0,n.jsx)(e.code,{children:\"navigator.credentials.get\"}),\" with a server-issued challenge and verify the assertion.\"]}),`\n`]}),`\n`,(0,n.jsx)(e.h2,{id:\"resources\",children:\"Resources\"}),`\n`,(0,n.jsxs)(r,{children:[(0,n.jsx)(o,{title:\"MDN: Web Authentication API\",href:\"https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API\",children:(0,n.jsx)(e.p,{children:\"Overview of WebAuthn APIs in the browser.\"})}),(0,n.jsx)(o,{title:\"Passkeys.dev\",href:\"https://passkeys.dev\",children:(0,n.jsx)(e.p,{children:\"Deep-dive into passkeys with patterns and UX guidance.\"})}),(0,n.jsx)(o,{title:\"W3C WebAuthn Spec\",href:\"https://w3c.github.io/webauthn/\",children:(0,n.jsx)(e.p,{children:\"Canonical specification for registration and authentication ceremonies.\"})})]})]})}function u(t={}){let{wrapper:e}=t.components||{};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(h,{...t})}):h(t)}function s(t,e){throw new Error(\"Expected \"+(e?\"component\":\"object\")+\" `\"+t+\"` to be defined: you likely forgot to import, pass, or provide it.\")}return k(A);})();\n;return Component;",
    "readingTime": "1 min read",
    "authorDetail": null
  },
  {
    "title": "React Performance with TanStack Patterns",
    "description": "Practical strategies to ship fast UIs using Query, Router, and Virtual.",
    "icon": "Zap",
    "cover": "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop",
    "content": "<Callout type=\"tip\">\nFocus on the highest-impact bottlenecks: network waterfalls, re-render churn, and long lists.\n</Callout>\n\n## Key tactics\n\n- Cache aggressively with `@tanstack/react-query` and avoid duplicate requests.\n- Co-locate route-driven data with `@tanstack/react-router` loaders.\n- Virtualize large lists with `@tanstack/react-virtual`. blah\n- Memoize stable props and avoid recreating functions on every render.\n\n## Example workflow\n\n1. Profile with the React DevTools Profiler and the Performance panel.\n2. Annotate slow components; add `memo` and `useMemo` where it matters.\n3. Move data fetching into Query with smart keys and `staleTime`.\n4. Virtualize any list over ~200 items.\n\n## Learn more\n\n<Cards>\n  <Card title=\"React Query Docs\" href=\"https://tanstack.com/query/latest\">\n    Patterns for caching, mutations, and background refetching.\n  </Card>\n  <Card title=\"TanStack Router\" href=\"https://tanstack.com/router/latest\">\n    File-based routing with loaders and deferred data.\n  </Card>\n  <Card title=\"React Virtual\" href=\"https://tanstack.com/virtual/latest\">\n    High-performance windowing for large lists and tables.\n  </Card>\n</Cards>",
    "tags": [],
    "_meta": {
      "filePath": "react-performance-tanstack-patterns.mdx",
      "fileName": "react-performance-tanstack-patterns.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "react-performance-tanstack-patterns"
    },
    "toc": [
      {
        "title": "Key tactics",
        "url": "#key-tactics",
        "depth": 2
      },
      {
        "title": "Example workflow",
        "url": "#example-workflow",
        "depth": 2
      },
      {
        "title": "Learn more",
        "url": "#learn-more",
        "depth": 2
      }
    ],
    "structuredData": {
      "contents": [
        {
          "content": "type: tip"
        },
        {
          "content": "Focus on the highest-impact bottlenecks: network waterfalls, re-render churn, and long lists."
        },
        {
          "heading": "key-tactics",
          "content": "Cache aggressively with @tanstack/react-query and avoid duplicate requests."
        },
        {
          "heading": "key-tactics",
          "content": "Co-locate route-driven data with @tanstack/react-router loaders."
        },
        {
          "heading": "key-tactics",
          "content": "Virtualize large lists with @tanstack/react-virtual. blah"
        },
        {
          "heading": "key-tactics",
          "content": "Memoize stable props and avoid recreating functions on every render."
        },
        {
          "heading": "example-workflow",
          "content": "Profile with the React DevTools Profiler and the Performance panel."
        },
        {
          "heading": "example-workflow",
          "content": "Annotate slow components; add memo and useMemo where it matters."
        },
        {
          "heading": "example-workflow",
          "content": "Move data fetching into Query with smart keys and staleTime."
        },
        {
          "heading": "example-workflow",
          "content": "Virtualize any list over ~200 items."
        },
        {
          "heading": "learn-more",
          "content": "Patterns for caching, mutations, and background refetching."
        },
        {
          "heading": "learn-more",
          "content": "File-based routing with loaders and deferred data."
        },
        {
          "heading": "learn-more",
          "content": "High-performance windowing for large lists and tables."
        }
      ],
      "headings": [
        {
          "id": "key-tactics",
          "content": "Key tactics"
        },
        {
          "id": "example-workflow",
          "content": "Example workflow"
        },
        {
          "id": "learn-more",
          "content": "Learn more"
        }
      ]
    },
    "body": "var Component=(()=>{var m=Object.create;var l=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,g=Object.prototype.hasOwnProperty;var k=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),y=(n,e)=>{for(var r in e)l(n,r,{get:e[r],enumerable:!0})},c=(n,e,r,a)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let i of p(e))!g.call(n,i)&&i!==r&&l(n,i,{get:()=>e[i],enumerable:!(a=f(e,i))||a.enumerable});return n};var x=(n,e,r)=>(r=n!=null?m(w(n)):{},c(e||!n||!n.__esModule?l(r,\"default\",{value:n,enumerable:!0}):r,n)),v=n=>c(l({},\"__esModule\",{value:!0}),n);var s=k((_,d)=>{d.exports=_jsx_runtime});var C={};y(C,{default:()=>u});var t=x(s());function h(n){let e={code:\"code\",h2:\"h2\",li:\"li\",ol:\"ol\",p:\"p\",ul:\"ul\",...n.components},{Callout:r,Card:a,Cards:i}=e;return r||o(\"Callout\",!0),a||o(\"Card\",!0),i||o(\"Cards\",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r,{type:\"tip\",children:(0,t.jsx)(e.p,{children:\"Focus on the highest-impact bottlenecks: network waterfalls, re-render churn, and long lists.\"})}),`\n`,(0,t.jsx)(e.h2,{id:\"key-tactics\",children:\"Key tactics\"}),`\n`,(0,t.jsxs)(e.ul,{children:[`\n`,(0,t.jsxs)(e.li,{children:[\"Cache aggressively with \",(0,t.jsx)(e.code,{children:\"@tanstack/react-query\"}),\" and avoid duplicate requests.\"]}),`\n`,(0,t.jsxs)(e.li,{children:[\"Co-locate route-driven data with \",(0,t.jsx)(e.code,{children:\"@tanstack/react-router\"}),\" loaders.\"]}),`\n`,(0,t.jsxs)(e.li,{children:[\"Virtualize large lists with \",(0,t.jsx)(e.code,{children:\"@tanstack/react-virtual\"}),\". blah\"]}),`\n`,(0,t.jsx)(e.li,{children:\"Memoize stable props and avoid recreating functions on every render.\"}),`\n`]}),`\n`,(0,t.jsx)(e.h2,{id:\"example-workflow\",children:\"Example workflow\"}),`\n`,(0,t.jsxs)(e.ol,{children:[`\n`,(0,t.jsx)(e.li,{children:\"Profile with the React DevTools Profiler and the Performance panel.\"}),`\n`,(0,t.jsxs)(e.li,{children:[\"Annotate slow components; add \",(0,t.jsx)(e.code,{children:\"memo\"}),\" and \",(0,t.jsx)(e.code,{children:\"useMemo\"}),\" where it matters.\"]}),`\n`,(0,t.jsxs)(e.li,{children:[\"Move data fetching into Query with smart keys and \",(0,t.jsx)(e.code,{children:\"staleTime\"}),\".\"]}),`\n`,(0,t.jsx)(e.li,{children:\"Virtualize any list over ~200 items.\"}),`\n`]}),`\n`,(0,t.jsx)(e.h2,{id:\"learn-more\",children:\"Learn more\"}),`\n`,(0,t.jsxs)(i,{children:[(0,t.jsx)(a,{title:\"React Query Docs\",href:\"https://tanstack.com/query/latest\",children:(0,t.jsx)(e.p,{children:\"Patterns for caching, mutations, and background refetching.\"})}),(0,t.jsx)(a,{title:\"TanStack Router\",href:\"https://tanstack.com/router/latest\",children:(0,t.jsx)(e.p,{children:\"File-based routing with loaders and deferred data.\"})}),(0,t.jsx)(a,{title:\"React Virtual\",href:\"https://tanstack.com/virtual/latest\",children:(0,t.jsx)(e.p,{children:\"High-performance windowing for large lists and tables.\"})})]})]})}function u(n={}){let{wrapper:e}=n.components||{};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(h,{...n})}):h(n)}function o(n,e){throw new Error(\"Expected \"+(e?\"component\":\"object\")+\" `\"+n+\"` to be defined: you likely forgot to import, pass, or provide it.\")}return v(C);})();\n;return Component;",
    "readingTime": "1 min read",
    "authorDetail": null
  }
]