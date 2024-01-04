'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import z from 'zod';

export async function like(prevState: any, formData: FormData) {
  const schema = z.object({
    event_series_id: z.coerce.number(),
  });
  const parse = schema.safeParse({
    event_series_id: formData.get('event_series_id'),
  });

  if (!parse.success) {
    return { message: 'Failed to like event series' };
  }

  const data = parse.data;
  const session = await getServerSession(authOptions);

  const liked = await prisma.userSeriesLike.findUnique({
    where: {
      user_id_event_series_id: {
        user_id: session?.user.id,
        event_series_id: data.event_series_id,
      },
    },
  });

  if (Boolean(liked)) {
    await prisma.userSeriesLike.delete({
      where: {
        user_id_event_series_id: {
          user_id: session?.user.id,
          event_series_id: data.event_series_id,
        },
      },
    });
    revalidatePath('/');
    return {
      message: 'Removed like from event series.',
      color: 'white',
      fill: '',
    };
  } else {
    await prisma.userSeriesLike.create({
      data: {
        user_id: session?.user.id,
        event_series_id: data.event_series_id,
      },
    });
    revalidatePath('/');
    return { message: 'Liked event series.', color: 'pink', fill: 'pink' };
  }
}

export async function favorite(prevState: any, formData: FormData) {
  const schema = z.object({
    event_series_id: z.coerce.number(),
  });
  const parse = schema.safeParse({
    event_series_id: formData.get('event_series_id'),
  });

  if (!parse.success) {
    return { message: 'Failed to like event series' };
  }

  const data = parse.data;
  const session = await getServerSession(authOptions);

  const favorited = await prisma.userSeriesFavorite.findUnique({
    where: {
      user_id_event_series_id: {
        user_id: session?.user.id,
        event_series_id: data.event_series_id,
      },
    },
  });

  if (Boolean(favorited)) {
    await prisma.userSeriesFavorite.delete({
      where: {
        user_id_event_series_id: {
          user_id: session?.user.id,
          event_series_id: data.event_series_id,
        },
      },
    });
    revalidatePath('/');
    return {
      message: 'Removed favorite from event series.',
      color: 'white',
      fill: '',
    };
  } else {
    await prisma.userSeriesFavorite.create({
      data: {
        user_id: session?.user.id,
        event_series_id: data.event_series_id,
      },
    });
    revalidatePath('/');
    return { message: 'Favorited event series.', color: 'cyan' };
  }
}

export async function subscribe(prevState: any, formData: FormData) {
  const schema = z.object({
    subscribed_to_id: z.string(),
    subscribed: z.string(),
  });
  const parse = schema.safeParse({
    subscribed_to_id: formData.get('subscribed_to_id'),
    subscribed: formData.get('subscribed'),
  });

  if (!parse.success) {
    return { message: 'Failed to like event series' };
  }

  const data = parse.data;
  const session = await getServerSession(authOptions);
  console.log('data sub', data.subscribed);

  if (data.subscribed === 'true') {
    await prisma.subscriptions.delete({
      where: {
        subscription_id: {
          subscribed_by_id: session?.user.id,
          subscribed_to_id: data.subscribed_to_id,
        },
      },
    });
    revalidatePath('/');
    return { message: 'Unsubscribed' };
  } else {
    await prisma.subscriptions.create({
      data: {
        subscribed_by_id: session?.user.id,
        subscribed_to_id: data.subscribed_to_id,
      },
    });
    revalidatePath('/');
    return { message: 'Subscribed' };
  }
}