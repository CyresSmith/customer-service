import SettingsBlock from 'components/Services/ServiceModal/ThirdStep/SettingsBlock';
import {
  Parameter,
  SettingsBlockBox,
} from 'components/Services/ServiceModal/ThirdStep/ThirdStep.styled';
import Button from 'components/Ui/Buttons/Button';
import { SelectItem } from 'components/Ui/Form/types';
import Modal from 'components/Ui/Modal/Modal';
import generateSelectTimeArray from 'helpers/generateSelectTimeArray';
import { useForm } from 'hooks';

type Props = {
  openModal: boolean;
  handleModalClose: () => void;
  serviceState: {
    price: number;
    durationHours: SelectItem;
    durationMinutes: SelectItem;
  };
};

const hoursArray = generateSelectTimeArray({
  min: 0,
  max: 24,
  step: 1,
  units: 'г.',
});

const minutesArray = generateSelectTimeArray({
  min: 0,
  max: 55,
  step: 5,
  units: 'хв.',
});

const EditEmployeeServiceModal = ({
  openModal,
  handleModalClose,
  serviceState,
}: Props) => {
  const onSubmit = (state: typeof serviceState) => {
    console.log(state);
  };

  const { handleChange, handleSelect, handleSubmit, reset, state } = useForm(
    serviceState,
    onSubmit
  );

  return (
    <Modal
      id="EditEmployeeServiceModal"
      $isOpen={openModal}
      closeModal={handleModalClose}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <SettingsBlockBox as="ul">
          <Parameter>Послуга</Parameter>
          <Parameter>Ціна, грн</Parameter>
          <Parameter>Час</Parameter>
        </SettingsBlockBox>

        <SettingsBlock
          handleChange={handleChange}
          handleSelect={handleSelect}
          durationHoursItems={hoursArray}
          durationHoursValue={state.durationHours}
          durationMinutesItems={minutesArray}
          durationMinutesValue={state.durationMinutes}
          priceValue={state.price}
          employeeId={'1'}
        >
          {/* <Employee>
            <EmployeeData {...(userData as IEmployee)} checkIcon={false} />
          </Employee> */}
          <div></div>
        </SettingsBlock>

        <div>
          <Button $colors="light" type="submit">
            Зберегти
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEmployeeServiceModal;
