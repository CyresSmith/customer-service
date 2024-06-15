import DatePicker from 'components/Ui/DatePicker';
import { FormInputLabel, FormInputsListItem, Required } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { ChangeEvent } from 'react';
import { DateTimeBox } from './DateTimePick.styled';

type Props = {
    date: Date;
    time: string;
    setDate: (date: Date) => void;
    setTime: (e: ChangeEvent<HTMLInputElement>) => void;
};

const DateTimePick = ({ date, setDate, time, setTime }: Props) => {
    return (
        <FormInputsListItem>
            <FormInputLabel>
                Дата та час <Required>{' (!)'}</Required>
            </FormInputLabel>

            <DateTimeBox>
                <DatePicker bgColor="dark" prevDate={date} handleDateConfirm={setDate} />
                <CustomFormInput
                    label={false}
                    type="time"
                    name="time"
                    value={time}
                    handleChange={setTime}
                />
            </DateTimeBox>
        </FormInputsListItem>
    );
};

export default DateTimePick;
