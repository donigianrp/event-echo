'use client';

import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input
        className="flex pl-8"
        autoFocus
        name="search"
        placeholder={placeholder}
        type="search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
