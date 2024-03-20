import { FormInputsListItem } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { SelectItem } from 'components/Ui/Form/types';
import { useAdminRights } from 'hooks';
import { ChangeEvent, ReactNode } from 'react';
import { DurationBox } from '../ServiceModal.styled';
import { SettingsBlockBox } from './ThirdStep.styled';

type Props = {
  handleSelect: (selected: SelectItem, fieldName?: string | undefined) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  priceValue: number;
  durationHoursValue: SelectItem;
  durationHoursItems: SelectItem[];
  durationMinutesValue: SelectItem;
  durationMinutesItems: SelectItem[];
  employeeId?: string;
  children: ReactNode;
};

const SettingsBlock = ({
  handleSelect,
  handleChange,
  priceValue,
  durationHoursValue,
  durationHoursItems,
  durationMinutesValue,
  durationMinutesItems,
  children,
}: Props) => {
  const isAdmin = useAdminRights();

  return (
    <SettingsBlockBox>
      {children}

      <FormInputsListItem as="div">
        <DurationBox>
          <CustomFormInput
            name="price"
            label={false}
            type="price"
            value={priceValue}
            handleChange={handleChange}
            disabledIcon
            isReadonly={!isAdmin}
          />
        </DurationBox>
      </FormInputsListItem>

      <FormInputsListItem as="div">
        <DurationBox>
          <CustomFormInput
            name="durationHours"
            type="select"
            label={false}
            value={durationHoursValue}
            selectItems={durationHoursItems}
            handleSelect={handleSelect}
            disabledIcon
            isReadonly={!isAdmin}
          />

          <CustomFormInput
            disabled={durationHoursValue.id === 24}
            name="durationMinutes"
            type="select"
            label={false}
            value={durationMinutesValue}
            selectItems={durationMinutesItems}
            handleSelect={handleSelect}
            disabledIcon
            isReadonly={!isAdmin}
          />
        </DurationBox>
      </FormInputsListItem>
    </SettingsBlockBox>
  );
};

export default SettingsBlock;
