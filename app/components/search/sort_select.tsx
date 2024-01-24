'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function SortSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('order', value);
    } else {
      params.delete('order');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={searchParams.get('order') || ''}
      onValueChange={(value) => {
        handleSelect(value);
      }}
    >
      <SelectTrigger className="min-w-[100px] xl:min-w-[250px] justify-between md:mt-0">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="views">Views</SelectItem>
          <SelectItem value="likes">Likes</SelectItem>
          <SelectItem value="favorites">Favorites</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
