// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function searchOptions (options:any[], searchQuery:string)  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredOptions = options.filter((option: any) => {
        const optionValues = Object.values(option).join(" ").toLowerCase();
        return optionValues.includes(searchQuery.toLowerCase());
      });

      return filteredOptions
}