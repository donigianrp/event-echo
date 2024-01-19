'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Props {
  options: { value: string; label: string }[];
  inputLabel: string;
  controller: [string, (val: string) => void];
}

export function Combobox({ options, inputLabel, controller }: Props) {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState('');
  const [value, setValue] = controller;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[100px] xl:min-w-[250px] justify-between mb-2 md:mt-0"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : `Select ${inputLabel}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[100px] lg:min-w-[250px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${inputLabel}...`} />
          <CommandEmpty>{`No ${inputLabel} found.`}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              return (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    setValue(option.value === value ? '' : option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
