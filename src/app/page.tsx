import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NewTodo from './new-todo';
import { Database } from '@/lib/database.types';
import Todo from './todo';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/unauthenticated');
  }

  const { data: todos } = await supabase
    .from('todos')
    .select()
    .match({ is_complete: false });

  return (
    <>
      <h1>Hello, {session.user.email}</h1>
      <NewTodo />
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
      <div className="flex flex-col gap-2 w-1/3">
        {todos?.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}
