import { useState } from "react";
import useDebounce from "@/app/hooks/useDebounce";
import SearchIcon from "../../icons/search_icon";


type Props = {
  label?: string;
  rounded?: boolean;
  hideAdd?: boolean;
  width?: string;
  onChange: ((value: string) => void);
  onSort?: () => void;
  onAdd?: () => void;
  value: string | undefined;
  hideFilter?: boolean;
  inputFieldHeight?: string;
  allowClickAdd?: boolean;
};

const SearchInput: React.FC<Props> = ({
  label = "Search...",
  rounded = false,
  onChange,
  onSort,
  value,
  inputFieldHeight,
}) => {
  
  const [inputValue, setInputValue] = useState(value);

  const debouncedOnChange = useDebounce(onChange, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    
    <div className="relative h-full w-full min-w-fit ">
      
      <SearchIcon
        className="pointer-events-none w-[15px] h-[15px] absolute top-1/2 transform -translate-y-1/2 left-4"
      />
      <input
        className={`w-full ${inputFieldHeight ? inputFieldHeight : "h-[48px]"
          } text-xs lg:text-sm text-[0.9rem] rounded-[6px] border-borderColor border-[1px] py-2 xl:py-[10px] pl-9 pr-7 lg:pr-12 placeholder:text-[12px] focus:outline-none ${rounded && "rounded-full"
          }`}
        placeholder={label}
        onChange={handleChange}
        value={inputValue}
      />
    
        <div
          onClick={onSort}
          className={`absolute pointer bg-[#004368] text-[12px] text-[#FFFFFF] h-[100%] w-[100px] flex justify-center items-center bg-primary rounded-r-[6px] top-1/2 -translate-y-1/2 right-0
            } `}
        >
          Search
        </div>
      
      
    </div>
  );
};

export default SearchInput;