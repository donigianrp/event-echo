import prisma from '@/db';
import EditUserForm from '../../conponents/edit_user_form';
import { getServerSession } from 'next-auth';
import LoginPrompt from '@/app/components/login_prompt';

export default async function EditUser({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return <p>Not logged in.</p>;
  }

  const id = Number(params.id);
  if (session.user.id !== id) {
    return <p>Cannot edit another user&#39;s profile.</p>;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return <EditUserForm user={user} />;
}
