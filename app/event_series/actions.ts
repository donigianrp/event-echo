'use server';

import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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
  const session = await getServerSession(authOptions);

  const eventSeries = await prisma.eventSeries.create({
    data: {
      title: data.title,
      description: data.description,
      creator_id: session?.user.id,
      is_private: data.is_private,
    },
  });

  revalidatePath('/');
  redirect(`/event_series/${eventSeries.id}`);
}

export async function editEventSeries(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.coerce.number(),
    title: z.string().min(1),
    description: z.string(),
    category: z.coerce.number(),
    subcategory: z.coerce.number().optional(),
    tags: z.preprocess(
      (val) => (typeof val === 'string' ? JSON.parse(val) : {}),
      z
        .object({ id: z.string(), text: z.string() })
        .pick({ text: true })
        .array(),
    ),
    is_private: z.preprocess(
      (val) => (typeof val === 'string' ? JSON.parse(val).is_private : {}),
      z.boolean(),
    ),
  });
  const parse = schema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    subcategory: formData.get('subcategory'),
    tags: formData.get('tags'),
    is_private: formData.get('is_private'),
  });

  if (!parse.success) {
    return { message: 'Failed to update event series' };
  }

  const data = parse.data;
  const session = await getServerSession(authOptions);

  const eventSeries = await prisma.eventSeries.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      creator_id: session?.user.id,
      is_private: data.is_private,
      updated_at: new Date(),
    },
    include: {
      event_type: true,
      event_tags: true,
    },
  });

  if (data.category && data.subcategory) {
    if (
      eventSeries.event_type === undefined ||
      eventSeries.event_type.length === 0
    ) {
      await prisma.eventTypeEventSeries.create({
        data: {
          event_series_id: data.id,
          category_id: data.category,
          sub_category_id: data.subcategory,
        },
      });
    } else {
      await prisma.eventTypeEventSeries.update({
        where: { event_series_id: data.id },
        data: {
          category_id: data.category,
          sub_category_id: data.subcategory,
        },
      });
    }
  } else if (eventSeries.event_type.length > 0) {
    await prisma.eventTypeEventSeries.delete({
      where: { event_series_id: data.id },
    });
  }

  await prisma.eventTagEventSeries.deleteMany({
    where: { event_series_id: data.id },
  });
  if (data.tags !== undefined && data.tags.length > 0) {
    for (let i = 0; i < data.tags.length; i++) {
      const tag = await prisma.eventTag.findUnique({
        where: { text: data.tags[i].text },
      });
      if (!tag) {
        await prisma.eventTag.create({
          data: { text: data.tags[i].text },
        });
      }
      await prisma.eventTagEventSeries.create({
        data: {
          event_series_id: data.id,
          event_tag_text: data.tags[i].text,
        },
      });
    }
  }

  revalidatePath('/event_series/[id]', 'page');
  redirect(`/event_series/${data.id}`);
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
    await prisma.userSeriesLike.deleteMany({
      where: { event_series_id: data.id },
    });
    await prisma.userSeriesFavorite.deleteMany({
      where: { event_series_id: data.id },
    });
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

export async function createEvent(prevState: any, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string(),
    eventSeriesId: z.number(),
  });
  const parse = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    eventSeriesId: formData.get('eventSeriesId'),
  });

  if (!parse.success) {
    return { message: 'Failed to create event' };
  }

  const data = parse.data;
  const session = await getServerSession(authOptions);

  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      creator_id: session?.user.id,
    },
  });

  const eventSeriesEvents = await prisma.eventSeriesEvent.findMany({
    where: { event_series_id: data.eventSeriesId },
  });

  const lastPosition = eventSeriesEvents.reduce((acc, el) => {
    return acc >= el.event_position ? acc : el.event_position;
  }, 0);

  const eventSeriesEvent = await prisma.eventSeriesEvent.create({
    data: {
      event_series_id: data.eventSeriesId,
      event_id: event.id,
      event_position: lastPosition + 1,
    },
  });

  revalidatePath('/');
  redirect(`/event_series/${data.eventSeriesId}`);
}
