import { Lock } from 'lucide-react';
import LoginPrompt from './login_prompt';

export default function AccessDenied({
  message,
  loggedIn,
}: {
  message: string;
  loggedIn: boolean;
}) {
  return (
    <div className="flex h-screen items-center">
      <div className="flex flex-col gap-4 mx-auto text-center">
        <Lock className="mx-auto" />
        <h1 className="text-3xl">Access denied</h1>
        <p className="text-lg">{message}</p>
        {!loggedIn && <LoginPrompt />}
      </div>
    </div>
  );
}
