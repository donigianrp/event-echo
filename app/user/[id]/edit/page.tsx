import prisma from '@/db';
import EditUserForm from '../../conponents/edit_user_form';

export default async function EditUser({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return <EditUserForm user={user} />;
}
