'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Todo from './todo';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RealtimeTodos({ todos }: { todos: Todo[] }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('realtime todos')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <div className="flex flex-col gap-2 w-1/3">
      {todos?.map((todo: Todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
