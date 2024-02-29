import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginPrompt from '@/app/components/login_prompt';
import AddEventSeriesForm from '@/app/workshop/components/add_event_series_form';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function EventSeriesCreate() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <LoginPrompt />;
  }
  return <AddEventSeriesForm />;
}
