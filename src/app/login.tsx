'use client';

import { Database } from '@/lib/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <form className="flex-1 flex w-1/3 flex-col gap-2 text-foreground">
        <label className="text-md">Email</label>
        <input
          type="text"
          name="email"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="text-md">Password</label>
        <input
          type="password"
          name="password"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </form>

      <div className="flex gap-2">
        <button
          className="bg-green-700 rounded px-4 py-2 text-white mb-6"
          onClick={handleSignUp}
        >
          Sign up
        </button>
        <button
          className="bg-green-700 rounded px-4 py-2 text-white mb-6"
          onClick={handleSignIn}
        >
          Sign in
        </button>
        <button
          className="bg-green-700 rounded px-4 py-2 text-white mb-6"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </>
  );
}
