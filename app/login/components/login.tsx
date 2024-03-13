'use client';

import SignIn from './sign_in';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-10">
      <h1 className="text-xl">Sign In</h1>
      <SignIn />
    </div>
  );
}
