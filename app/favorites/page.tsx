import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginPrompt from '../components/login_prompt';

const Favorites = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginPrompt />;
  }

  return <div className="flex justify-center p-2">Favorites</div>;
};

export default Favorites;
