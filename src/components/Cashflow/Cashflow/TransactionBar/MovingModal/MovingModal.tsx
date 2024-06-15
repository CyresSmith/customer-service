import Button from 'components/Ui/Buttons/Button';
import {
    Form,
    FormInputLabel,
    FormInputsListItem,
    Required,
} from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import Modal from 'components/Ui/Modal/Modal';
import { format, getDate, getMonth, getTime, getYear } from 'date-fns';
import { getTimeInMilliseconds } from 'helpers/timeConversion';
import { useCompany } from 'hooks/useCompany';
import { ChangeEvent, useState } from 'react';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useAddMovingTransactionMutation } from 'services/cashbox.api';
import { TransactionModalProps } from 'services/types/transaction.types';
import { AddButtonBox } from '../IncomeModal/IncomeModal.styled';
import DateTimePick from '../PickDateTime/DateTimePick';

const MovingModal = ({
    isModalOpen,
    handleModalClose,
    cashboxes,
    creator,
}: TransactionModalProps) => {
    const today = new Date(Date.now());
    const { id: companyId } = useCompany();

    const [selectedCashbox, setSelectedCashbox] = useState<SelectItem | null>(null);
    const [toCashbox, setToCashbox] = useState<SelectItem | null>(null);
    const [selectedDate, setSelectedDate] = useState(today);
    const [time, setTime] = useState(format(getTime(today), 'HH:mm'));
    const [comments, setComments] = useState('');
    const [amount, setAmount] = useState(0);

    const [addMovingTransaction, { isLoading }] = useAddMovingTransactionMutation();

    const cashbox = cashboxes?.find(({ id }) => id === selectedCashbox?.id);

    const handleCashboxSelect = (item: SelectItem) => {
        setAmount(0);
        setSelectedCashbox(item);
    };

    const handleToCashboxSelect = (item: SelectItem) => {
        setToCashbox(item);
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

    const isAddDisabled =
        !selectedCashbox || !toCashbox || !selectedDate || !time || amount === 0 || comments === '';

    const handleMovingAdd = async () => {
        if (!creator || !selectedCashbox || !selectedCashbox.id || !toCashbox || !toCashbox.id)
            return;

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
            toCashboxId: +toCashbox.id,
            creator,
            comments,
        };

        const resp = await addMovingTransaction({ companyId, data }).unwrap();

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
                title="Переміщєння коштів"
                closeModal={handleModalClose}
            >
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

                    <FormInputsListItem>
                        <FormInputLabel>
                            Картка призначення / рахунок призначення <Required>{' (!)'}</Required>
                        </FormInputLabel>

                        <CustomFormSelect
                            selectItems={cashboxes.map(({ id, name }) => ({
                                id,
                                value: name,
                            }))}
                            selectedItem={toCashbox}
                            handleSelect={handleToCashboxSelect}
                        />
                    </FormInputsListItem>

                    <DateTimePick
                        date={selectedDate}
                        setDate={handleDateSelect}
                        time={time}
                        setTime={handleTimeSelect}
                    />

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

                    <AddButtonBox>
                        <Button
                            isLoading={isLoading}
                            disabled={isAddDisabled}
                            children="Зберегти"
                            Icon={IoIosSave}
                            $colors="accent"
                            onClick={handleMovingAdd}
                        />
                    </AddButtonBox>
                </Form>
            </Modal>
        </>
    );
};

export default MovingModal;
