import { FC } from "react";

type ComboboxProps = {
  placeholder: string;
};

export const Combobox: FC<ComboboxProps> = ({ placeholder = "" }) => {
  return (
    <div className='combobox'>
      <input type='text' placeholder={placeholder} className='combobox-input' />
    </div>
  );
};
