import VisuallyHidden from 'components/Ui/VisuallyHidden';
import { translateLabels } from 'helpers/translateLabels';
import { ChangeEvent } from 'react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { Required } from '../CustomForm.styled';
import { Name, StyledIcon, StyledLabel } from './Checkbox.styled';

type Props = {
  name: string;
  isChecked: boolean;
  isRequired?: boolean;
  handleCheck: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  name,
  isRequired = false,
  isChecked = false,
  handleCheck,
}: Props) => {
  return (
    <StyledLabel $isChecked={isChecked}>
      <StyledIcon
        as={isChecked ? HiCheckCircle : HiXCircle}
        $isChecked={isChecked}
      />
      <Name>
        {translateLabels(name)} {isRequired && <Required>{'(!)'}</Required>}
      </Name>

      <VisuallyHidden>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={handleCheck}
        />
      </VisuallyHidden>
    </StyledLabel>
  );
};

export default Checkbox;
