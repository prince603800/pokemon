import dropdown from "@assets/user/dropdown.svg";

type DropdownProps = {
  options: { name: string; value: string }[];
  name: string;
  className?: string;
  placeholder?: string;
  onChange?: any;
};

const Select = ({
  options,
  name,
  className,
  placeholder,
  onChange,
}: DropdownProps) => {
  return (
    <div className="relative">
      <select
        name={name}
        id={name}
        defaultValue=""
        onChange={onChange}
        className={`w-full appearanceNone h-full p-2 rounded-md text-sm bg-white border-[1px] border-borderColor focus:outline-none cursor-pointer ${className}`}
      >
        {placeholder && (
          <option disabled={true} value="" className="hidden">
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option
            value={option.value}
            key={option.name + option.value + index}
          >
            {option.name}
          </option>
        ))}
      </select>
      {/* <div className="absolute h-full flex items-center text-primary top-0 right-1 text-sm">
        <div className=" h-[24px] w-[24px] flex justify-center items-center">
          <img src={dropdown} alt="v" />
        </div>
      </div> */}
    </div>
  );
};

export default Select;
