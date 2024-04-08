import AddEmployeeModal from 'components/Employees/AddEmployeeModal';
import { Message } from 'components/Employees/AddEmployeeModal/AddEmployeeModal.styled';
import Button from 'components/Ui/Buttons/Button';
import ItemsList from 'components/Ui/ItemsList';
import { ServiceOpenModal } from 'helpers/enums';
import { useAdminRights } from 'hooks';
import { useState } from 'react';
import { HiUserAdd } from 'react-icons/hi';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { IoIosSave } from 'react-icons/io';
import { ServiceStepProps } from 'services/types/service.type';
import { ButtonBox as SaveButtonBox, SecondStepBox } from '../ServiceModal.styled';
import { ButtonBox } from './SecondStep.styled';

const SecondStep = ({
    openModal,
    setStep,
    serviceData,
    setServiceData,
    providers,
    stateToCheck,
    handleServiceUpdate,
    isServiceUpdateLoading,
}: ServiceStepProps) => {
    const isAdmin = useAdminRights();
    const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);

    const handleSelect = (_: unknown, selected?: number[] | undefined) => {
        if (!isAdmin) return;

        selected &&
            setServiceData(p => ({
                ...p,
                employees: selected.map(id => Number(id)),
            }));
    };

    const handleBackClick = () => {
        setStep(1);
    };

    const handleNextClick = () => {
        setStep(3);
    };

    const handleAddEmployeeClose = () => {
        setAddEmployeeOpen(false);
    };

    const serviceUpdate = async () => {
        handleServiceUpdate({ employees: serviceData.employees });
    };

    const saveDisabled =
        JSON.stringify(stateToCheck?.employees) === JSON.stringify(serviceData?.employees);

    return (
        <>
            <SecondStepBox>
                {providers &&
                    (providers.length < 1 ? (
                        <Message>Немає працівників що надають послуги</Message>
                    ) : (
                        <ItemsList
                            items={providers.map(
                                ({ id, avatar, firstName, lastName, jobTitle }) => ({
                                    id,
                                    avatar,
                                    name: `${firstName} ${lastName && lastName}`,
                                    jobTitle,
                                })
                            )}
                            keyForSelect="jobTitle"
                            onItemClick={handleSelect}
                            selection={
                                isAdmin
                                    ? serviceData.employees
                                        ? serviceData.employees.map(id => +id)
                                        : []
                                    : undefined
                            }
                        />
                    ))}

                {openModal === ServiceOpenModal.EDIT_SERVICE && isAdmin && (
                    <SaveButtonBox>
                        <Button
                            onClick={serviceUpdate}
                            disabled={saveDisabled || isServiceUpdateLoading}
                            Icon={IoIosSave}
                            $colors="accent"
                            isLoading={isServiceUpdateLoading}
                        >
                            Зберегти
                        </Button>
                    </SaveButtonBox>
                )}

                {openModal === ServiceOpenModal.ADD && (
                    <ButtonBox>
                        <Button
                            $colors="light"
                            Icon={HiArrowLeft}
                            $iconPosition="l"
                            onClick={handleBackClick}
                        >
                            Назад
                        </Button>

                        <Button
                            $colors="light"
                            Icon={HiUserAdd}
                            onClick={() => setAddEmployeeOpen(true)}
                        >
                            Додати нового
                        </Button>

                        <Button
                            $colors="accent"
                            disabled={serviceData.employees.length === 0}
                            Icon={HiArrowRight}
                            $iconPosition="r"
                            onClick={handleNextClick}
                        >
                            Далі
                        </Button>
                    </ButtonBox>
                )}
            </SecondStepBox>

            {addEmployeeOpen && (
                <AddEmployeeModal isOpen={addEmployeeOpen} closeModal={handleAddEmployeeClose} />
            )}
        </>
    );
};

export default SecondStep;
