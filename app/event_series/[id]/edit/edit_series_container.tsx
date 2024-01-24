'use client';
import React, { useState, createContext } from 'react';
import EditSeriesTabs from './edit_series_tabs';
import EditSeriesContent from './edit_series_content';
import { EditSeriesContextProps, EventSeriesEditTabs } from './page';
import {
  CategoryModel,
  EventModel,
  EventSeriesModel,
  SubCategoryModel,
} from '@/global';

interface Props {
  editSeriesContextProps: EditSeriesContextProps;
}

export const EditSeriesContext = createContext<{
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  eventSeries: EventSeriesModel;
  events: EventModel[];
  tab: EventSeriesEditTabs;
  setTab: (val: EventSeriesEditTabs) => void;
  positionMap: { [val: number]: number };
} | null>(null);

const EditSeriesContainer = ({ editSeriesContextProps }: Props) => {
  const [tab, setTab] = useState<EventSeriesEditTabs>('details');
  const { categories, subCategories, events, positionMap } =
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
        }}
      >
        <EditSeriesTabs />
        <EditSeriesContent />
      </EditSeriesContext.Provider>
    </div>
  );
};

export default EditSeriesContainer;
