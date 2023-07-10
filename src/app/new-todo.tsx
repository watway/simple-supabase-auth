import { Database } from '@/lib/database.types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export default async function NewTodo() {
  const addTodo = async (formData: FormData) => {
    'use server';

    const title = formData.get('title');
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.from('todos').insert({ title });
    revalidatePath('/');
  };

  return (
    <form action={addTodo}>
      <h1>New Todo</h1>
      <input name="title" className="border-2" />
    </form>
  );
}
