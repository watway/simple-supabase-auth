import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export default async function NewTodo() {
  const addTodo = async (formData: FormData) => {
    'use server';

    const title = String(formData.get('title'));
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.from('todos').insert({ title });
    revalidatePath('/');
  };

  return (
    <form
      action={addTodo}
      className="flex-1 flex w-1/3 flex-col gap-2 text-foreground"
    >
      <h1>New Todo</h1>
      <input
        name="title"
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
      />
    </form>
  );
}
