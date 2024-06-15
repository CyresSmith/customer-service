import Button from 'components/Ui/Buttons/Button';
import ChoseWay from 'components/Ui/ChoseWay';
import {
    Form,
    FormInput,
    FormInputLabel,
    FormInputsListItem,
    Required,
} from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import ItemsList from 'components/Ui/ItemsList';
import Modal from 'components/Ui/Modal/Modal';
import { format, getDate, getMonth, getTime, getYear } from 'date-fns';
import { getTimeInMilliseconds } from 'helpers/timeConversion';
import { useCompany } from 'hooks/useCompany';
import { ChangeEvent, useEffect, useState } from 'react';
import { HiIdentification, HiReply, HiSearch, HiX } from 'react-icons/hi';
import { HiBanknotes } from 'react-icons/hi2';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import {
    useAddPurchaseTransactionMutation,
    useAddSalaryTransactionMutation,
} from 'services/cashbox.api';
import { EmployeeBasicInfo } from 'services/types/employee.types';
import { TransactionBasicInfo, TransactionModalProps } from 'services/types/transaction.types';
import {
    AddButtonBox,
    ClientsInputBox,
    ListBox,
    ModalContentBox,
    SearchIcon,
} from '../IncomeModal/IncomeModal.styled';
import DateTimePick from '../PickDateTime/DateTimePick';

type Props = {
    employees: EmployeeBasicInfo[];
};

const ways = [
    {
        id: 1,
        icon: HiBanknotes,
        title: 'Закупка',
        desc: 'Витрати на закупівлю',
    },
    {
        id: 2,
        icon: HiIdentification,
        title: 'Зарплата',
        desc: 'Оплата праці співробітників',
    },
];

enum OpenModal {
    EMPLOYEES = 1,
}

const LIST_MODAL_WIDTH = '552px';

const ExpenseModal = ({
    isModalOpen,
    handleModalClose,
    cashboxes,
    creator,
    employees,
}: TransactionModalProps & Props) => {
    const today = new Date(Date.now());
    const { id: companyId } = useCompany();

    const [way, setWay] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState<OpenModal | null>(null);
    const [selectedCashbox, setSelectedCashbox] = useState<SelectItem | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState(today);
    const [time, setTime] = useState(format(getTime(today), 'HH:mm'));
    const [comments, setComments] = useState('');
    const [amount, setAmount] = useState(0);

    const [addPurchaseTransaction, { isLoading: isPurchaseAddLoading }] =
        useAddPurchaseTransactionMutation();
    const [addSalaryTransaction, { isLoading: isSalaryAddLoading }] =
        useAddSalaryTransactionMutation();

    const cashbox = cashboxes?.find(({ id }) => id === selectedCashbox?.id);

    const employee = employees?.find(({ id }) => id === selectedEmployeeId);
    const employeeName = employee ? employee?.firstName + ' ' + employee?.lastName : 'Не обрано';

    const isPurchaseWay = way === 1;
    const isSalaryWay = way === 2;

    const handleWaySelect = (id: number) => setWay(id);

    const handleCashboxSelect = (item: SelectItem) => {
        setAmount(0);
        setSelectedCashbox(item);
    };

    const resetSelection = () => {
        setAmount(0);
    };

    const handleDateSelect = (date: Date) => {
        resetSelection();
        setSelectedDate(date);
    };

    const handleTimeSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    };

    const handleEmployeeRemove = () => {
        setSelectedEmployeeId(null);
    };

    const modalTitle =
        'Витрата' + `${way === 1 ? ' на закупівлю' : way === 2 ? ' на зарплату' : ''}`;

    const closeModal = () => setOpenModal(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'amount' && selectedCashbox && cashbox) {
            const balance = cashbox.balance;

            setAmount(+value <= balance ? +value : balance);
        }

        if (name === 'comments') {
            setComments(value);
        }
    };

    const handleEmployeesSelect = (id: number) => {
        setSelectedEmployeeId(id);
        resetSelection();
        setOpenModal(null);
    };

    useEffect(() => {
        setComments('');
    }, [selectedDate]);

    const isAddDisabled =
        !selectedCashbox ||
        !selectedDate ||
        !time ||
        amount === 0 ||
        comments === '' ||
        isPurchaseAddLoading ||
        isSalaryAddLoading;

    const handleBackClick = () => {
        setSelectedCashbox(null);
        resetSelection();
        setWay(null);
    };

    const handleExpenseAdd = async () => {
        if (!creator || !selectedCashbox || !selectedCashbox.id) return;

        const year = getYear(selectedDate);
        const month = getMonth(selectedDate);
        const day = getDate(selectedDate);

        const data = {
            year,
            month,
            day,
            time: getTimeInMilliseconds(time),
            amount,
            cashbox: +selectedCashbox.id,
            creator,
            comments,
        };

        let resp: TransactionBasicInfo | null = null;

        if (isPurchaseWay) {
            const dto = {
                companyId,
                data,
            };

            resp = await addPurchaseTransaction(dto).unwrap();
        }

        if (isSalaryWay && selectedEmployeeId) {
            const dto = {
                companyId,
                data: { ...data, employee: selectedEmployeeId },
            };

            resp = await addSalaryTransaction(dto).unwrap();
        }

        if (resp) {
            toast.success('Витрату зараховано');
            handleModalClose();
        }
    };

    return (
        <>
            <Modal
                id="expenseModal"
                $w="500px"
                $isOpen={isModalOpen}
                title={modalTitle}
                closeModal={handleModalClose}
            >
                {!way ? (
                    <ChoseWay ways={ways} setWay={handleWaySelect} />
                ) : (
                    <Form>
                        <FormInputsListItem>
                            <FormInputLabel>
                                Картка / рахунок <Required>{' (!)'}</Required>
                            </FormInputLabel>

                            <CustomFormSelect
                                selectItems={cashboxes.map(({ id, name }) => ({
                                    id,
                                    value: name,
                                }))}
                                selectedItem={selectedCashbox}
                                handleSelect={handleCashboxSelect}
                            />
                        </FormInputsListItem>

                        <DateTimePick
                            date={selectedDate}
                            setDate={handleDateSelect}
                            time={time}
                            setTime={handleTimeSelect}
                        />

                        {isSalaryWay && (
                            <>
                                <FormInputsListItem>
                                    <FormInputLabel>
                                        Співробітник <Required>{' (!)'}</Required>
                                    </FormInputLabel>

                                    <ClientsInputBox $isClient={Boolean(selectedEmployeeId)}>
                                        <FormInput
                                            type="text"
                                            name="employee"
                                            value={employeeName}
                                            onClick={() => setOpenModal(OpenModal.EMPLOYEES)}
                                            readOnly
                                        />

                                        <SearchIcon id="SearchIcon" as={HiSearch} />

                                        {selectedEmployeeId && (
                                            <Button
                                                id="removeItem"
                                                Icon={HiX}
                                                onClick={handleEmployeeRemove}
                                                $colors="danger"
                                                $variant="text"
                                                $round
                                            />
                                        )}
                                    </ClientsInputBox>
                                </FormInputsListItem>
                            </>
                        )}

                        <CustomFormInput
                            isRequired
                            disabled={!selectedCashbox}
                            type="price"
                            name="amount"
                            value={amount}
                            handleChange={handleChange}
                        />

                        <CustomFormInput
                            isRequired
                            type="textarea"
                            name="comments"
                            value={comments}
                            handleChange={handleChange}
                        />

                        <AddButtonBox $backButton>
                            <Button
                                children="Назад"
                                Icon={HiReply}
                                $colors="light"
                                onClick={handleBackClick}
                            />

                            <Button
                                isLoading={isPurchaseAddLoading || isSalaryAddLoading}
                                disabled={isAddDisabled}
                                children="Зберегти"
                                Icon={IoIosSave}
                                $colors="accent"
                                onClick={handleExpenseAdd}
                            />
                        </AddButtonBox>
                    </Form>
                )}
            </Modal>

            {openModal === OpenModal.EMPLOYEES && employees && employees.length > 0 && (
                <Modal
                    $w={LIST_MODAL_WIDTH}
                    $isOpen={openModal === OpenModal.EMPLOYEES}
                    id="findEmployees"
                    closeModal={closeModal}
                    title="Вибір виконавців"
                >
                    <ModalContentBox>
                        <ListBox>
                            <ItemsList
                                items={employees.map(
                                    ({ id, firstName, lastName, jobTitle, avatar }) => {
                                        const name = firstName + ' ' + lastName;

                                        return {
                                            id,
                                            name,
                                            jobTitle: jobTitle || 'Власник',
                                            avatar,
                                        };
                                    }
                                )}
                                onItemClick={handleEmployeesSelect}
                                nameColumnTitle="Ім'я"
                                keyForSelect="jobTitle"
                            />
                        </ListBox>
                    </ModalContentBox>
                </Modal>
            )}
        </>
    );
};

export default ExpenseModal;
