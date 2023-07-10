import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NewTodo from './new-todo';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/unauthenticated');
  }

  const { data } = await supabase.from('todos').select();

  return (
    <>
      <h1>Hello, {session.user.email}</h1>
      <NewTodo />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
