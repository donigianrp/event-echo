'use client';
import React, { useState, createContext } from 'react';
import EditSeriesTabs from './edit_series_tabs';
import EditSeriesContent from './edit_series_content';
import { EventSeriesEditTabs } from './page';
import { CategoryModel, EventSeriesModel, SubCategoryModel } from '@/global';

interface Props {
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  eventSeries: EventSeriesModel;
}

export const EditSeriesContext = createContext<{
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  eventSeries: EventSeriesModel;
  tab: EventSeriesEditTabs;
  setTab: (val: EventSeriesEditTabs) => void;
} | null>(null);

const EditSeriesContainer = ({
  categories,
  subCategories,
  eventSeries,
}: Props) => {
  const [tab, setTab] = useState<EventSeriesEditTabs>('details');

  return (
    <div>
      <EditSeriesContext.Provider
        value={{
          categories,
          subCategories,
          eventSeries,
          tab,
          setTab,
        }}
      >
        <EditSeriesTabs />
        <EditSeriesContent />
      </EditSeriesContext.Provider>
    </div>
  );
};

export default EditSeriesContainer;
