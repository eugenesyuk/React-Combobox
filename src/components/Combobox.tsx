import { FC, useState } from "react";
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
  const [showPopover, setShowPopover] = useState(true);

  return (
    <div className='combobox'>
      <input type='text' placeholder={placeholder} className='combobox-input' />
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
