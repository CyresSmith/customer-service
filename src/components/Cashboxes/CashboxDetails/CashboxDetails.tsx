import CustomForm from 'components/Ui/Form/CustomForm';
import { InputProps, SelectItem } from 'components/Ui/Form/types';
import Loader from 'components/Ui/Loader';
import { format } from 'date-fns';
import { useCompany } from 'hooks/useCompany';
import { IoMdSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useGetCashboxByIdQuery, useUpdateCashboxMutation } from 'services/cashbox.api';
import { CashboxDetailsBox, Detail, DetailName, DetailsBox } from './CashboxDetails.styled';

type Props = { id: number; employees: SelectItem[]; handleModalClose: () => void };

const inputs: InputProps[] = [
    { name: 'name', type: 'text', value: '' },
    { name: 'responsible', type: 'select', value: false },
    { name: 'comment', type: 'textarea', value: false },
    { name: 'isActive', type: 'checkbox', value: false },
];

const CashboxDetails = ({ id, employees, handleModalClose }: Props) => {
    const { id: companyId } = useCompany();

    const { data: cashbox, isLoading: isCashboxLoading } = useGetCashboxByIdQuery({
        companyId,
        id,
    });

    const [updateCashbox, { isLoading: isCashboxUpdateLoading }] = useUpdateCashboxMutation();

    const initialState = {
        name: cashbox?.name || '',
        comment: cashbox?.comment || '',
        responsible: cashbox
            ? {
                  id: cashbox?.responsible.id,
                  value: cashbox?.responsible.firstName + ' ' + cashbox?.responsible.lastName,
              }
            : false,
        isActive: cashbox?.isActive || false,
    };

    const handleCashboxUpdate = async (state: typeof initialState) => {
        if (state.responsible && typeof state.responsible !== 'boolean' && state.responsible.id) {
            const data = {
                ...state,
                responsible: +state.responsible?.id,
            };

            const { message } = await updateCashbox({ data, companyId, id }).unwrap();

            if (message) {
                handleModalClose();
                toast.success(message);
            }
        }
    };

    return isCashboxLoading ? (
        <Loader />
    ) : (
        <>
            <CashboxDetailsBox>
                <DetailsBox>
                    <DetailName>Створено:</DetailName>
                    <Detail>{cashbox && format(cashbox?.createdAt, 'PPpp')}</Detail>
                </DetailsBox>

                <DetailsBox>
                    <DetailName>Баланс:</DetailName>
                    <Detail>{cashbox?.balance}.00 грн</Detail>
                </DetailsBox>
            </CashboxDetailsBox>

            <CustomForm
                inputs={inputs}
                buttonLabel="Зберегти"
                onSubmit={handleCashboxUpdate}
                initialState={initialState}
                isLoading={false}
                SubmitButtonIcon={IoMdSave}
                visibleSelectItems={3}
                selectItems={employees}
            />
        </>
    );
};

export default CashboxDetails;
