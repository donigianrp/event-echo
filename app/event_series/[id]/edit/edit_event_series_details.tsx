'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { editEventSeries } from '../../actions';
import { useContext, useState } from 'react';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';
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
import { CategoryModel, EventSeriesModel, SubCategoryModel } from '@/global';
import { CheckedState } from '@radix-ui/react-checkbox';
import { EditSeriesContext } from './edit_series_container';

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
});

interface Props {
  eventSeries: EventSeriesModel;
}

const EditEventSeriesDetails = ({ eventSeries }: Props) => {
  const [state, formAction] = useFormState(editEventSeries, initialState);
  const [title, setTitle] = useState(eventSeries.title || '');
  const [description, setDescription] = useState(eventSeries.description || '');
  const [checked, setChecked] = useState<CheckedState>(eventSeries.is_private);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [cancelled, setCancelled] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
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
          console.log(form);
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

  const filterSubCategories = (subs: SubCategoryModel[]) => {
    return subs.filter((sub) => sub.category_value === category);
  };

  const resetSubCategoryAndSetCategory = (val: string) => {
    setSubCategory('');
    setCategory(val);
  };

  return (
    <Form {...form}>
      <form action={formAction} className="w-full">
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
                    name="title"
                    required
                    className="border-b p-1"
                    aria-required="true"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
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
                    name="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
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
              <FormLabel className="text-left">Category</FormLabel>
              <div className="md:flex justify-between md:w-8/12">
                <div className="">
                  <Combobox
                    options={categories}
                    inputLabel={'Category'}
                    controller={[category, resetSubCategoryAndSetCategory]}
                  />
                </div>
                {category && (
                  <div>
                    <Combobox
                      options={filterSubCategories(subCategories)}
                      inputLabel={'Sub Category'}
                      controller={[subCategory, setSubCategory]}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-2 leading-none">
            <Checkbox
              id="is_private"
              name="is_private"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <Label htmlFor="is_private">Private</Label>
          </div>
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
