import { ButtonBox } from 'components/Services/ServiceModal/ServiceModal.styled';
import SettingsBlock from 'components/Services/ServiceModal/ThirdStep/SettingsBlock';
import {
    Parameter,
    SettingsBlockBox,
} from 'components/Services/ServiceModal/ThirdStep/ThirdStep.styled';
import Button from 'components/Ui/Buttons/Button';
import { SelectItem } from 'components/Ui/Form/types';
import Modal from 'components/Ui/Modal/Modal';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import generateSelectTimeArray from 'helpers/generateSelectTimeArray';
import { useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useUpdateServiceDataMutation } from 'services/service.api';
import { EmployeesServiceSettings } from 'services/types/service.type';
import { ServiceDataBox, ServiceName } from '../EmployeeServices.styled';
import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';

type Props = {
    openModal: boolean;
    handleModalClose: () => void;
    service: {
        id: number;
        employeeId: number;
        name: string;
        avatar: string;
        employeesSettings: EmployeesServiceSettings[];
        state: {
            price: number;
            durationHours: SelectItem;
            durationMinutes: SelectItem;
        };
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

const EditEmployeeServiceModal = ({ openModal, handleModalClose, service }: Props) => {
    const { id: companyId } = useCompany();
    const [updateService, { isLoading }] = useUpdateServiceDataMutation();

    const onSubmit = async (state: typeof service.state) => {
        let update: { price: number; duration?: number } = { price: state.price };

        if (state.durationHours && Number(state.durationHours.id) > 0) {
            update = Object.assign(update, {
                duration: hoursToMilliseconds(Number(state.durationHours.id)),
            });
        }

        if (state.durationMinutes && Number(state.durationMinutes.id) > 0) {
            update = Object.assign(update, {
                duration: update?.duration
                    ? update.duration + minutesToMilliseconds(Number(state.durationMinutes.id))
                    : minutesToMilliseconds(Number(state.durationMinutes.id)),
            });
        }

        const employeeSettingIdx = service.employeesSettings.findIndex(
            ({ employeeId }) => employeeId === service.employeeId
        );

        let data: EmployeesServiceSettings[] = [...service.employeesSettings];

        if (employeeSettingIdx === -1) {
            data = [...data, { ...update, employeeId: +service.employeeId }];
        } else {
            data[employeeSettingIdx] = { ...data[employeeSettingIdx], ...update };
        }

        const { message } = await updateService({
            companyId: +companyId,
            serviceId: service.id,
            data: { employeesSettings: data },
        }).unwrap();

        if (message) {
            handleModalClose();
            toast.success(message);
        }
    };

    const { handleChange, handleSelect, handleSubmit, state, invalidFields } = useForm(
        service.state,
        onSubmit
    );

    return (
        <Modal id="EditEmployeeServiceModal" $isOpen={openModal} closeModal={handleModalClose}>
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
                    employeeId={1}
                >
                    <ServiceDataBox>
                        <ItemAvatar avatar={service.avatar.toString()} name={service.name} />

                        <ServiceName>{service.name}</ServiceName>
                    </ServiceDataBox>
                </SettingsBlock>

                <ButtonBox>
                    <Button
                        isLoading={isLoading}
                        Icon={IoIosSave}
                        type="submit"
                        disabled={
                            isLoading ||
                            JSON.stringify(service.state) === JSON.stringify(state) ||
                            invalidFields.length > 0
                        }
                        $colors="accent"
                    >
                        Зберегти
                    </Button>
                </ButtonBox>
            </form>
        </Modal>
    );
};

export default EditEmployeeServiceModal;
