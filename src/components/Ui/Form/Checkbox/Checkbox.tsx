import VisuallyHidden from 'components/Ui/VisuallyHidden';
import { translateLabels } from 'helpers/translateLabels';
import { ChangeEvent } from 'react';
import { HiCheckCircle, HiMinusCircle } from 'react-icons/hi';
import { Required } from '../CustomForm.styled';
import { Name, StyledIcon, StyledLabel } from './Checkbox.styled';

type Props = {
  name: string;
  isChecked: boolean;
  isRequired?: boolean;
  isReadonly?: boolean;
  disabled?: boolean;
  handleCheck: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  name,
  isRequired = false,
  isReadonly = false,
  isChecked = false,
  handleCheck,
  disabled = false,
}: Props) => {
  return (
    <StyledLabel $isChecked={isChecked} $isDisabled={isReadonly || disabled}>
      <StyledIcon
        as={isChecked ? HiCheckCircle : HiMinusCircle}
        $isChecked={isChecked}
        $isDisabled={isReadonly || disabled}
      />
      <Name>
        {translateLabels(name)} {isRequired && <Required>{'(!)'}</Required>}
      </Name>

      <VisuallyHidden>
        <input
          disabled={isReadonly}
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={e => {
            if (disabled) return;
            handleCheck(e);
          }}
        />
      </VisuallyHidden>
    </StyledLabel>
  );
};

export default Checkbox;
