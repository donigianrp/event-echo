import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import SignIn from './components/sign_in';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import Link from 'next/link';

const Login = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex flex-col bg-slate-700 bg-opacity-30 backdrop-blur-md">
        <h1 className="p-8 font-medium text-2xl">Event Echo</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col mx-auto p-8 space-y-6 w-full sm:w-3/5">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Sign In</h2>
            <p className="text-sm text-muted-foreground">
              Enter your email to log in
            </p>
          </div>
          <div className="grid gap-6">
            <form>
              <div className="grid gap-2">
                <Input id="email" type="email" placeholder="name@example.com" />
                <Button type="submit">Sign In</Button>
              </div>
            </form>
            <Separator />
            <SignIn />
            <div className="text-center text-muted-foreground">
              {`Don't have an account? `}
              <Link href={'/'} className="underline hover:text-primary">
                Sign up
              </Link>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
