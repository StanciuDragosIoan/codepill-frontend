# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (no prior build needed)
npm run build    # Production build (also runs TypeScript + lint checks)
npm run start    # Start production server
npm run lint     # ESLint (next/core-web-vitals)
```

There is no test runner configured.

## Architecture

**Next.js 15 with App Router**. All routes live in `app/`, API route handlers in `app/api/`.

### Directory structure

- `app/layout.tsx` — Root layout (Server Component): reads `codePillTheme` cookie, injects GTM script and Font Awesome CSS, wraps the app in `UserContextProvider` + `Layout`
- `app/page.tsx`, `app/about/page.tsx`, etc. — Page Server Components
- `app/posts/[slug]/page.tsx` — Dynamic post page; uses `generateMetadata` for `<title>`; `params` is a `Promise` in Next.js 15 and must be awaited
- `app/api/*/route.ts` — Route Handlers (named exports `GET`, `POST`)
- `components/` — Feature-grouped React components
- `context/user.tsx` — `UserContext` + `UserContextProvider` (Client Component)
- `domain/` — TypeScript type definitions (`Post` interface)
- `lib/posts-utils.tsx` — Markdown parsing (`getFeaturedPosts`, `getAllPosts`, `getPostData`); return types are loosely inferred, cast to `Post` / `Post[]` at call sites
- `posts/` — Markdown blog content with frontmatter (gray-matter)
- `styles/globals.css` — `@import` must precede `@tailwind` directives (CSS rule); Tailwind CSS 3 + custom CSS properties

### Client vs Server Components

All page files in `app/` are **Server Components** by default. Components that use React hooks or event handlers have `"use client"` at the top:

| Component                                          | Reason                              |
| -------------------------------------------------- | ----------------------------------- |
| `context/user.tsx`                                 | `useState`, `createContext`         |
| `components/layout/layout.tsx`                     | `useContext`, `useEffect`           |
| `components/layout/navigation/main-navigation.tsx` | `useContext`, `useState`, `useMemo` |
| `components/hero/hero.tsx`                         | `useContext`                        |
| `components/posts/allPosts/postItem.tsx`           | `useContext`                        |
| `components/posts/postContent/postContent.tsx`     | `useContext`, event handlers        |
| `components/contact/contactForm.tsx`               | `useContext`, `useState`            |
| `app/success/page.tsx`                             | `useSearchParams`, `useEffect`      |
| `app/fail/page.tsx`                                | `onClick` event handler             |

Components without hooks (`logo.tsx`, `allPosts.tsx`, `postGrid.tsx`, `featuredPosts.tsx`, `postHeader.tsx`) are Server Components and do not need `"use client"`.

### Data flow

- **Theme**: Read server-side from the `codePillTheme` cookie in `app/layout.tsx` using `await cookies()` from `next/headers`. Passed as `themeProp` to `UserContextProvider`, which manages it as client state. The navigation component writes updates back to the cookie client-side.
- **Blog posts**: Static Markdown files in `/posts`, read at request time via `gray-matter` in `posts-utils.tsx`, rendered with `react-markdown` (v9) + `react-syntax-highlighter`.
- **Payments**: Stripe checkout session created in `app/api/create-checkout-session/route.ts`. Webhook handled in `app/api/buyMe/route.ts` — raw body read via `request.arrayBuffer()` (no `bodyParser: false` config needed in App Router). Stripe client instantiated inside handler functions (not at module level) to avoid build-time failures when `STRIPE_SECRET_KEY` is absent.
- **Contact form**: `app/api/contact/route.ts` stores submissions in MongoDB.

### react-markdown v9 component API (in `postContent.tsx`)

- `code`: language extracted from `className` (e.g. `language-js`) via regex
- `a`: renders with `target="_blank"` (replaces removed `linkTarget` prop)
- `p`: checks `node.children[0].tagName === "img"` to render markdown images via `next/image`
- No wrapper element around `<ReactMarkdown>` — v9 renders a Fragment

### TypeScript

Strict mode, TypeScript 5. Path alias `@/*` maps to the repo root.
