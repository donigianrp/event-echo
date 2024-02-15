'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { editEventSeries } from '../../actions';
import { useContext, useState } from 'react';
import { Checkbox } from '../../../components/ui/checkbox';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Input } from '../../../components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag, TagInput } from '@/app/components/ui/tag-input';
import { Combobox } from '@/app/components/ui/combobox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { EventSeriesModel } from '@/global';
import { EditSeriesContext } from './edit_series_container';
import { EventSubCategory } from '@prisma/client';

const initialState = {
  message: '',
};

const FormSchema = z.object({
  title: z.string().min(1, {
    message: 'Invalid series title',
  }),
  description: z.string(),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
  category: z.string(),
  subcategory: z.string(),
  is_private: z.boolean().default(false).optional(),
});

interface Props {
  eventSeries: EventSeriesModel;
}

const EditEventSeriesDetails = ({ eventSeries }: Props) => {
  const [state, formAction] = useFormState(editEventSeries, initialState);
  const [category, setCategory] = useState(
    String(eventSeries.category_id) || '',
  );
  const [subCategory, setSubCategory] = useState(
    String(eventSeries.sub_category_id) || '',
  );
  const [cancelled, setCancelled] = useState(false);
  const [tags, setTags] = useState<Tag[]>(eventSeries.tags);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: eventSeries.title,
      description: eventSeries.description || '',
      tags: tags,
      category: category,
      subcategory: subCategory,
      is_private: eventSeries.is_private,
    },
  });

  const localStore = useContext(EditSeriesContext);
  if (!localStore) return <></>;
  const { categories, subCategories, tab } = localStore;
  const { setValue } = form;
  // const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (cancelled) {
    redirect(`/event_series/${eventSeries.id}`);
  }

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button
        id="submit"
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        onClick={() => {
          // console.log(form);
        }}
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </>
        ) : (
          <>Submit</>
        )}
      </Button>
    );
  }

  const filterSubCategories = (subs: EventSubCategory[]) => {
    return subs.filter((sub) => String(sub.category_id) === category);
  };

  const resetSubCategoryAndSetCategory = (val: string) => {
    setSubCategory('');
    setCategory(val);
    setValue('subcategory', '');
    setValue('category', val);
  };

  const setSubCategoryInForm = (val: string) => {
    setSubCategory(val);
    setValue('subcategory', val);
  };

  const submitForm = (values: z.infer<typeof FormSchema>) => {
    let params = new FormData();
    params.append('id', String(eventSeries.id));
    params.append('title', values.title);
    params.append('description', values.description);
    params.append('category', values.category);
    params.append('subcategory', values.subcategory);
    params.append('tags', JSON.stringify(values.tags));
    params.append(
      'is_private',
      JSON.stringify({ is_private: values.is_private }),
    );
    formAction(params);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="w-full">
        <div className="flex flex-col gap-6">
          <Input type="hidden" name="id" value={eventSeries.id} />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter title here..."
                    type="text"
                    required
                    className="border-b p-1"
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a brief description about your event series..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Card>
            <CardHeader>
              <CardTitle>Labeling</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Tags</FormLabel>
                    <FormControl>
                      <TagInput
                        {...field}
                        variant={'primary'}
                        placeholder="Enter a tag"
                        tags={tags}
                        className="sm:min-w-[350px]"
                        setTags={(newTags) => {
                          setTags(newTags);
                          setValue('tags', newTags as [Tag, ...Tag[]]);
                        }}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    These are the topics that you&apos;re interested in.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-left">Category</FormLabel>
                      <div className="">
                        <Combobox
                          options={categories}
                          inputLabel={'Category'}
                          controller={[
                            category,
                            resetSubCategoryAndSetCategory,
                          ]}
                        />
                      </div>
                    </FormItem>
                  )}
                />
                {category && (
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">Subcategory</FormLabel>
                        <div>
                          <Combobox
                            options={filterSubCategories(subCategories)}
                            inputLabel={'Sub Category'}
                            controller={[subCategory, setSubCategoryInForm]}
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </CardContent>
          </Card>
          <FormField
            control={form.control}
            name="is_private"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Private</FormLabel>
              </FormItem>
            )}
          />
          <div className="flex gap-4 justify-end">
            <Button variant="secondary" onClick={() => setCancelled(true)}>
              Cancel
            </Button>
            <SubmitButton />
          </div>
          <p aria-live="polite" className="sr-only" role="status">
            {state?.message}
          </p>
        </div>
      </form>
    </Form>
  );
};

export default EditEventSeriesDetails;
