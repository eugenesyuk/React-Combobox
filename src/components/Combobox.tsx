import { ChangeEvent, FC, MouseEvent, useState } from "react";
import cn from "classnames";
import "./Combobox.scss";

type FruitOption = {
  text: string;
  value: string;
};

type ComboboxProps = {
  placeholder: string;
  data: Array<FruitOption>;
};

export const Combobox: FC<ComboboxProps> = ({
  placeholder = "",
  data = [],
}) => {
  const [optionsArray, setOptionsArray] = useState(data);
  const [showPopover, setShowPopover] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filterOptions = (term: string) => {
    const filtered = data.filter((item) => {
      const itemValue = item.value.toLowerCase();
      return itemValue.includes(term.toLowerCase());
    });

    setOptionsArray(filtered);
    setShowPopover(filtered.length ? true : false);
  };

  const onInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    filterOptions(event.currentTarget.value);
  };

  const onOptionSelect = (event: MouseEvent<HTMLLIElement>) => {
    if (event.currentTarget.dataset.index) {
      const index = parseInt(event.currentTarget.dataset.index);
      setInputValue(optionsArray[index]?.value);
      setShowPopover(false);
    }
  };

  const onInputBlured = () => {
    setShowPopover(false);
  };

  const onPopoverMouseDown = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className='combobox'>
      <input
        type='text'
        value={inputValue}
        placeholder={placeholder}
        className={cn("combobox", showPopover && "suggesting")}
        onChange={onInputChanged}
        onBlur={onInputBlured}
      />
      {showPopover && (
        <ul className='combobox-popover'>
          {optionsArray.map((item, index) => (
            <li
              className='combobox-popover-item'
              key={index}
              data-index={index}
              onClick={onOptionSelect}
              onMouseDown={onPopoverMouseDown}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
