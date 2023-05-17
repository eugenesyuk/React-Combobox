import { ChangeEvent, FC, useState } from "react";
import './Combobox.scss';

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

  return (
    <div className='combobox'>
      <input type='text' value={inputValue} placeholder={placeholder} className='combobox-input' onChange={onInputChanged} />
      {showPopover && (
        <ul className="combobox-popover">
          {optionsArray.map((item, index) => (
            <li
              className="combobox-popover-item"
              key={index}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
