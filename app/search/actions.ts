'use server';

import z from 'zod';

export async function search(prevState: any, formData: FormData) {
  const schema = z.object({
    query: z.string().trim().min(1),
  });
  const parse = schema.safeParse({
    query: formData.get('query'),
  });

  if (!parse.success) {
    return { message: 'Search unsuccessful' };
  }

  const data = parse.data;

  return { message: `Successfully searched for ${data.query}` };
}
