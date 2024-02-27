import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import Login from '../login/components/login';

export default function LoginPrompt() {
  return (
    <div className="flex h-screen items-center">
      <div className="flex mx-auto justify-center items-center">
        <Dialog>
          <DialogTrigger className="underline hover:text-primary">
            Sign in
          </DialogTrigger>
          <DialogContent>
            <Login />
          </DialogContent>
        </Dialog>
        &nbsp;to view this page.
      </div>
    </div>
  );
}
