'use client';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { toast } from '@/app/components/ui/use-toast';
import {
  EventSeriesModel,
  YouTubeCommentResp,
  YouTubeSearchResp,
} from '@/global';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { EditSeriesContext } from './edit_series_container';
import { useRouter } from 'next/navigation';

interface DialogProps {
  title: string;
  eventSeries: EventSeriesModel;
  handleEventCreation: (
    event: EventReqParams,
    contentId: string,
    seriesId: number,
  ) => Promise<void>;
  details: {
    event: EventReqParams;
    contentId: string;
    seriesId: number;
  };
}

const AddEventDialog = ({
  title,
  eventSeries,
  handleEventCreation,
  details,
}: DialogProps) => {
  const [open, setOpen] = useState(false);
  const { event, seriesId, contentId } = details;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PlusCircle
          onClick={() => {}}
          className={`text-gray-600 hover:text-primary`}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add &quot;<b>{title}</b>&quot;
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This will be added to &quot;<b>{eventSeries.title}</b>&quot;, please
          confirm.
        </DialogDescription>

        <Button
          onClick={() => {
            setOpen(false);
            handleEventCreation(event, contentId, seriesId);
          }}
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};

interface Props {
  sourceContent: YouTubeSearchResp;
}

export interface EventReqParams {
  title: string;
  description: string;
  creator_id: number;
  channelId: string;
  channelTitle: string;
  eventSeriesId: number;
  videoId: string;
  socialMediaId: string;
  socialMediaPlatformId: number;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
  };
}

const AddEventCard = ({ sourceContent }: Props) => {
  const { title, description, thumbnails, channelTitle, channelId } =
    sourceContent.snippet;
  const videoId = sourceContent.id.videoId;
  const router = useRouter();
  const localStore = useContext(EditSeriesContext);
  if (!localStore) return <></>;
  const { eventSeries, session } = localStore;

  const createEvent = async (event: EventReqParams) => {
    try {
      const response = await fetch(
        `/api/event_series/${eventSeries?.id}/event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ event }),
        },
      );
      const body = await response.json();
      if (body.status === 403) {
        throw new Error(body.message);
      }
      return {
        eventId: body.event.event_id,
        sourceContentId: body.sourceContentId,
      };
    } catch (error) {
      return new Error('403');
    }
  };

  const fetchComments = async (contentId: string) => {
    try {
      const response = await fetch(`/api/youtube/comments/${contentId}`);
      const results: { items: YouTubeCommentResp[] } = await response.json();
      if (!results) {
        throw new Error('400');
      } else {
        return results.items;
      }
    } catch (error) {
      return new Error('400');
    }
  };

  const handleEventCreation = async (
    event: EventReqParams,
    contentId: string,
    seriesId: number,
  ) => {
    try {
      const resp: { eventId: number; sourceContentId: number } | Error =
        await createEvent(event);
      if (resp instanceof Error) {
        throw new Error('403');
      }
      const { eventId, sourceContentId } = resp;
      const contents = await fetchComments(contentId);
      if (contents instanceof Error) {
        throw new Error('400');
      }

      console.log('CONTENTS', contents);
      const results = await fetch(
        `/api/event_series/${seriesId}/event/${eventId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contents, sourceContentId: sourceContentId }),
        },
      );
      if (!results) {
        throw new Error('400');
      }
      toast({ title: 'Successfully created event' });
      router.refresh();
    } catch (err) {
      if (err instanceof Error && err.message === '403') {
        toast({ title: 'Event already exists' });
      } else {
        toast({ title: 'Failed to create event' });
      }
    }
  };

  const parser = new DOMParser();
  const decodedTitle = parser.parseFromString(title, 'text/html').body
    .textContent;
  return (
    <div>
      <Card className="flex flex-col justify-between h-full">
        <CardHeader>
          <div className={`flex justify-between`}>
            <CardTitle>{decodedTitle}</CardTitle>
            <div className={`ml-2`}>
              <AddEventDialog
                title={title}
                eventSeries={eventSeries}
                handleEventCreation={handleEventCreation}
                details={{
                  event: {
                    title,
                    description,
                    videoId,
                    creator_id: 1,
                    eventSeriesId: eventSeries.id,
                    socialMediaId: channelId,
                    socialMediaPlatformId: 1,
                    thumbnails,
                    channelId,
                    channelTitle,
                  },
                  seriesId: eventSeries.id,
                  contentId: videoId,
                }}
              />
            </div>
          </div>
        </CardHeader>
        <div>
          <CardContent className={`flex flex-col justify-end`}>
            <div className={`flex flex-col justify-end`}>
              <div className="flex flex-1">
                <div className="mr-1 text-sm">Channel:</div>
                <div className={`text-sm`}>{channelTitle}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className={`p-0 bg-slate-300`}>
            <Image
              className={`m-auto`}
              alt="source content thumbnail"
              src={thumbnails.medium.url || ''}
              width={thumbnails.medium.width || 160}
              height={thumbnails.medium.height || 90}
            />
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default AddEventCard;
