- npx create-next-app@latest
- add .nvmrc -> lts/hydrogen
- npx supabase init
- npx supabase start
- npx supabase migration new add_todos
- add to new migration:
```
create table if not exists todos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text,
  is_complete boolean default false,
  user_id uuid references auth.users default auth.uid()
);
```
- add to seed.sql
```
insert into todos(title)
values
  ('Create Supabase project'),
  ('Create Next.js app from Supabase Starter template'),
  ('Keep building cool stuff!');
```
- npx supabase db reset
- npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
- create .env.local and add following.  Use the details displayed with the `npx supabase start` step
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
- Generate database types - npx supabase gen types typescript --local > src/common/database.types.ts
- Enable RLS and add policy to 'allow users to read their own todos'
  - (user_id = auth.uid())
- 


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
