'use server';

import prisma from '@/db';
import { revalidatePath } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';
import { z } from 'zod';

export async function createEventSeries(prevState: any, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string(),
    is_private: z.coerce.boolean(),
  });
  const parse = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    is_private: formData.get('is_private'),
  });

  if (!parse.success) {
    return { message: 'Failed to create event series' };
  }

  const data = parse.data;

  const event_series = await prisma.eventSeries.create({
    data: {
      title: data.title,
      description: data.description,
      creator_id: 1,
      is_private: data.is_private,
    },
  });

  revalidatePath('/');
  return redirect(`/event_series/${event_series.id}`);
}

export async function editEventSeries(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.coerce.number(),
    title: z.string().min(1),
    description: z.string(),
    is_private: z.coerce.boolean(),
  });
  const parse = schema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    is_private: formData.get('is_private'),
  });

  if (!parse.success) {
    return { message: 'Failed to update event series' };
  }

  const data = parse.data;

  await prisma.eventSeries.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      creator_id: 1,
      is_private: data.is_private,
      updated_at: new Date(),
    },
  });

  revalidatePath('/event_series/[id]', 'page');
  return redirect(`/event_series/${data.id}`, RedirectType.replace);
}

export async function deleteEventSeries(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.coerce.number(),
    title: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get('id'),
    title: formData.get('title'),
  });

  try {
    await prisma.eventSeries.delete({
      where: { id: data.id },
    });

    revalidatePath('/');
    return { message: `Deleted event series ${data.title}` };
  } catch (e) {
    console.log(e);
    return { message: 'Failed to delete event series' };
  }
}
