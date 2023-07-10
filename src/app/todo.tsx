'use client';

import { useRouter } from 'next/navigation';

export default function Todo({ todo }: { todo: any }) {
  const router = useRouter();

  const markAsComplete = async () => {
    await fetch(`http://localhost:3000/todos`, {
      method: 'put',
      body: JSON.stringify({ id: todo.id }),
    });
    router.refresh();
  };

  return (
    <button
      className="bg-blue-700 rounded px-4 py-2 text-white mb-6"
      onClick={markAsComplete}
    >
      {todo.title}
    </button>
  );
}
