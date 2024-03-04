import { ChangeEvent } from 'react';

type Props = {
  name: string;
  multiple?: boolean;
  value: string;
  selectItems: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const FormSelect = ({ name, value = '', selectItems, onChange }: Props) => {
  return (
    <div>
      <select onChange={onChange} value={value} name={name}>
        {selectItems.map(name => (
          <option>{name}</option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
