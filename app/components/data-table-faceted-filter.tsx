import { Check, PlusCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { z } from "zod";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const UserStatusItemSchema = z.object({
    text: z.string(),
    value: z.string(),
});

export function DataTableFacetedFilter({ title, optionArray, setFilters, filterKey }: { title: string, optionArray: any, setFilters: (filters: any) => void, filterKey: string }) {
    const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
    const parsed = z.array(UserStatusItemSchema).parse(optionArray);
    const options: { label: string; value: string }[] = parsed.map(item => ({
        label: item.text,
        value: item.value,
    }));
    useEffect(() => {
        const myArray = Array.from(selectedValues).length ? Array.from(selectedValues) : undefined;
        setFilters((prev: any) => ({
            ...prev,
            [filterKey]: myArray,
        }));
    }, [selectedValues]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircle />
                    {title}
                    {selectedValues.size > 0 && (
                        <span className="ml-2 text-xs text-muted-foreground">
                            ({selectedValues.size} selected)
                        </span>
                    )}
                    {/* {selectedValues?.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedValues.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValues.size} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )} */}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(option.value);
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            const newSet = new Set(selectedValues);
                                            if (isSelected) {
                                                newSet.delete(option.value);
                                            } else {
                                                newSet.add(option.value);
                                            }
                                            setSelectedValues(newSet);
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}

                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <hr className="my-2" />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => setSelectedValues(new Set())}
                                        className="justify-center text-center text-red-500"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                        {/* {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => column?.setFilterValue(undefined)}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )} */}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}