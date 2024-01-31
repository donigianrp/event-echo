import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import Login from '../login/components/login';

export default function LoginPrompt() {
  return (
    <div className="flex w-1/2 mx-auto justify-center items-center">
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
  );
}
