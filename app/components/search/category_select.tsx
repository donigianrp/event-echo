'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { EventCategory } from '@prisma/client';
import { useState } from 'react';
import { Combobox } from '../ui/combobox';
import { SubcategoryWithCategory } from '../pagination/pagination_page';

export default function CategorySelect({
  categories,
  subcategories,
}: {
  categories: EventCategory[];
  subcategories: SubcategoryWithCategory[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [subcategory, setSubcategory] = useState(
    searchParams.get('subcategory') || '',
  );

  const handleCategory = (c: string) => {
    const params = new URLSearchParams(searchParams);
    if (c) {
      params.set('category', c);
      params.set('page', '1');
      params.delete('subcategory');
    } else {
      params.delete('category');
      params.delete('subcategory');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSubcategory = (sc: string) => {
    const params = new URLSearchParams(searchParams);
    if (sc) {
      params.set('subcategory', sc);
      params.set('page', '1');
    } else {
      params.delete('subcategory');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const filterSubCategories = (subs: SubcategoryWithCategory[]) => {
    return subs.filter(
      (sub) =>
        sub.event_category &&
        (String(sub.event_category.id) === category ||
          sub.event_category.value === category),
    );
  };

  const resetSubCategoryAndSetCategory = (val: string) => {
    setSubcategory('');
    setCategory(val);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Combobox
        options={categories}
        inputLabel="Category"
        controller={[category, resetSubCategoryAndSetCategory]}
        handleSelect={handleCategory}
      />
      <Combobox
        options={filterSubCategories(subcategories)}
        inputLabel="Subcategory"
        controller={[subcategory, setSubcategory]}
        handleSelect={handleSubcategory}
      />
    </div>
  );
}
