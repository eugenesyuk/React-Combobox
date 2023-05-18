import { ChangeEvent, FC, MouseEvent, useId, useRef, useState } from "react";
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
  const selectedRef = useRef<HTMLLIElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
  
  const setSelectedOption = (option: HTMLLIElement) => {
    if (selectedRef?.current) selectedRef.current.ariaSelected = 'false';
    option.ariaSelected = 'true';
    selectedRef.current = option
  };

  const onOptionSelect = (event: MouseEvent<HTMLLIElement>) => {
    if (event.currentTarget.dataset.index) {
      const index = parseInt(event.currentTarget.dataset.index);
      setInputValue(optionsArray[index]?.value);
      setShowPopover(false);
      setSelectedOption(event.currentTarget);
      inputRef.current && inputRef.current.blur();
    }
  };

  const onInputFocused = () => {
    optionsArray.length && setShowPopover(true);
  };

  const onInputBlured = () => {
    setShowPopover(false);
  };

  const onPopoverMouseDown = (event: MouseEvent) => {
    event.preventDefault();
  };

  const listboxId = useId()

  return (
    <div className={cn("combobox", showPopover && "suggesting")}>
      <input
        type='text'
        value={inputValue}
        placeholder={placeholder}
        className='combobox-input'
        onFocus={onInputFocused}
        onChange={onInputChanged}
        onBlur={onInputBlured}
        ref={inputRef}
        aria-autocomplete='both'
        aria-controls={`listbox-${listboxId}`}
        aria-expanded={showPopover}
        aria-haspopup='listbox'
        aria-label={placeholder}
        role='combobox'
      />
      <ul className='combobox-popover' id={`listbox-${listboxId}`}>
        {optionsArray.map((item, index) => (
          <li
            className='combobox-popover-item'
            key={index}
            data-index={index}
            onClick={onOptionSelect}
            onMouseDown={onPopoverMouseDown}
            aria-selected="false"
            role="option"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
