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
import { useAddChangeBalanceTransactionMutation } from 'services/cashbox.api';
import { TransactionModalProps } from 'services/types/transaction.types';
import { AddButtonBox } from '../IncomeModal/IncomeModal.styled';
import DateTimePick from '../PickDateTime/DateTimePick';

const ChangeModal = ({
    isModalOpen,
    handleModalClose,
    cashboxes,
    creator,
}: TransactionModalProps) => {
    const today = new Date(Date.now());
    const { id: companyId } = useCompany();

    const [selectedCashbox, setSelectedCashbox] = useState<SelectItem | null>(null);
    const [selectedDate, setSelectedDate] = useState(today);
    const [time, setTime] = useState(format(getTime(today), 'HH:mm'));
    const [balance, setBalance] = useState(0);
    const [comments, setComments] = useState('');

    const [addChangeBalance, { isLoading }] = useAddChangeBalanceTransactionMutation();

    const cashbox = cashboxes?.find(({ id }) => id === selectedCashbox?.id);

    const handleCashboxSelect = (item: SelectItem) => setSelectedCashbox(item);

    const handleDateSelect = (date: Date) => setSelectedDate(date);

    const handleTimeSelect = (e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'balance' && selectedCashbox && cashbox) {
            setBalance(+value);
        }

        if (name === 'comments') {
            setComments(value);
        }
    };

    const isAddDisabled = !selectedCashbox || !selectedDate || !time || comments === '';

    const handleChangeAdd = async () => {
        if (!creator || !selectedCashbox || !selectedCashbox.id) return;

        const year = getYear(selectedDate);
        const month = getMonth(selectedDate);
        const day = getDate(selectedDate);

        const data = {
            year,
            month,
            day,
            time: getTimeInMilliseconds(time),
            balance,
            cashbox: +selectedCashbox.id,
            creator,
            comments,
        };

        const resp = await addChangeBalance({ companyId, data }).unwrap();

        if (resp) {
            toast.success('Баланс змінено');
            handleModalClose();
        }
    };

    return (
        <Modal
            id="changeModal"
            $w="500px"
            $isOpen={isModalOpen}
            title="Зміна залишку"
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
                    name="balance"
                    value={balance}
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
                        disabled={isAddDisabled}
                        children="Зберегти"
                        Icon={IoIosSave}
                        $colors="accent"
                        onClick={handleChangeAdd}
                    />
                </AddButtonBox>
            </Form>
        </Modal>
    );
};

export default ChangeModal;
