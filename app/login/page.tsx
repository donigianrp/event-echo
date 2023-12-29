import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import SignIn from './components/sign_in';

const Login = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-1/2 mx-auto">
      {session && (
        <div>
          <p>Signed in as {session.user && session.user.name}</p>
          <a href="/api/auth/signout">Sign out by link</a>
        </div>
      )}

      {!session && (
        <div>
          <p>Not signed in</p>
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default Login;
