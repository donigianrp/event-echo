import prisma from '@/db';
import EditUserForm from '../../conponents/edit_user_form';
import { getServerSession } from 'next-auth';
import AccessDenied from '@/app/components/access_denied';

export default async function EditUser({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return (
      <AccessDenied
        message="Must be signed in to edit user profile."
        loggedIn={false}
      />
    );
  }

  const id = Number(params.id);
  if (session.user.id !== id) {
    return (
      <AccessDenied
        message="Cannot edit another user's profile."
        loggedIn={true}
      />
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return <EditUserForm user={user} />;
}
