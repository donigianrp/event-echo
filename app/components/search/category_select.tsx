'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { EventCategory, EventSubCategory } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Combobox } from '../ui/combobox';

export default function CategorySelect({
  categories,
  subcategories,
}: {
  categories: EventCategory[];
  subcategories: EventSubCategory[];
}) {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (searchParams.get('category')) {
      setCategory(searchParams.get('category') || '');
    }

    if (searchParams.get('subcategory')) {
      setSubcategory(searchParams.get('subcategory') || '');
    }
  }, []);

  const handleCategory = (c: string) => {
    const params = new URLSearchParams(searchParams);
    if (c) {
      params.set('category', c);
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
    } else {
      params.delete('subcategory');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const filterSubCategories = (subs: EventSubCategory[]) => {
    return subs.filter((sub) => sub.category_value === category);
  };

  const resetSubCategoryAndSetCategory = (val: string) => {
    setSubcategory('');
    setCategory(val);
  };

  return (
    <div className="flex gap-4">
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
