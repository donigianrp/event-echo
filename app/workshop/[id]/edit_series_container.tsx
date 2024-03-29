'use client';
import React, { useState, createContext } from 'react';
import EditSeriesTabs from './edit_series_tabs';
import EditSeriesContent from './edit_series_content';
import {
  EditSeriesContextProps,
  EventSeriesEditTabs,
  EventWithThumbnails,
} from './page';
import { EventSeriesModel } from '@/global';
import { Session } from 'next-auth';
import { EventCategory, EventSubCategory } from '@prisma/client';

interface Props {
  editSeriesContextProps: EditSeriesContextProps;
}

export const EditSeriesContext = createContext<{
  categories: EventCategory[];
  subCategories: EventSubCategory[];
  eventSeries: EventSeriesModel;
  events: EventWithThumbnails[];
  tab: EventSeriesEditTabs;
  setTab: (val: EventSeriesEditTabs) => void;
  positionMap: { [val: number]: number };
  session: Session | null;
} | null>(null);

const EditSeriesContainer = ({ editSeriesContextProps }: Props) => {
  const [tab, setTab] = useState<EventSeriesEditTabs>('details');
  const { categories, subCategories, events, positionMap, session } =
    editSeriesContextProps;

  const eventSeries = editSeriesContextProps.eventSeries;
  if (!eventSeries) {
    return <></>;
  }
  return (
    <div>
      <EditSeriesContext.Provider
        value={{
          categories,
          subCategories,
          eventSeries,
          events,
          tab,
          setTab,
          positionMap,
          session,
        }}
      >
        <EditSeriesTabs />
        <EditSeriesContent />
      </EditSeriesContext.Provider>
    </div>
  );
};

export default EditSeriesContainer;
