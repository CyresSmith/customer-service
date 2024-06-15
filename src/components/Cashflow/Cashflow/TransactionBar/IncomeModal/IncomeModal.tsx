import ClientForm from 'components/ClientsListPage/ClientForm';
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
import { format, getDate, getMonth, getTime, getYear, isSameDay, startOfDay } from 'date-fns';
import { addClientInitialState } from 'helpers/constants';
import { getTimeInMilliseconds } from 'helpers/timeConversion';
import { useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { ChangeEvent, useEffect, useState } from 'react';
import {
    HiCalendar,
    HiClipboardList,
    HiIdentification,
    HiPlus,
    HiReply,
    HiSearch,
    HiShoppingCart,
    HiX,
} from 'react-icons/hi';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import {
    useAddSellTransactionMutation,
    useAddServiceTransactionMutation,
} from 'services/cashbox.api';
import { useCreateClientMutation, useGetAllClientsQuery } from 'services/clients.api';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import { useGetCompanyEventsQuery } from 'services/events.api';
import { useGetServicesQuery } from 'services/service.api';
import { CashboxBasicInfo } from 'services/types/cashbox.types';
import { Client } from 'services/types/clients.types';
import { EventType } from 'services/types/event.types';
import { ServiceBasicInfo } from 'services/types/service.type';
import { TransactionBasicInfo } from 'services/types/transaction.types';
import DateTimePick from '../PickDateTime/DateTimePick';
import {
    AddButtonBox,
    ClientsInputBox,
    ListBox,
    ModalContentBox,
    SearchIcon,
} from './IncomeModal.styled';

type Props = {
    isModalOpen: boolean;
    handleModalClose: () => void;
    cashboxes: CashboxBasicInfo[];
};

const ways = [
    {
        id: 1,
        icon: HiIdentification,
        title: 'Послуга',
        desc: 'Доход від виконаної послуги',
    },
    {
        id: 2,
        icon: HiShoppingCart,
        title: 'Продаж',
        desc: 'Доход від продажу товара',
    },
];

const servicesWays = [
    {
        id: 1,
        icon: HiClipboardList,
        title: 'Послуга',
        desc: 'Обрати з переліку послуг',
    },
    {
        id: 2,
        icon: HiCalendar,
        title: 'Запис',
        desc: 'Обрати з переліку записів в обарний день',
    },
];

enum OpenModal {
    CLIENT = 1,
    CHOSE_WAY = 2,
    EVENT = 3,
    SERVICE = 4,
    ADD_CLIENT = 5,
    EMPLOYEES = 6,
}

const LIST_MODAL_WIDTH = '552px';

const IncomeModal = ({ isModalOpen, handleModalClose, cashboxes }: Props) => {
    const today = new Date(Date.now());
    const { id: companyId } = useCompany();
    const { user } = useAuth();

    const [way, setWay] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState<OpenModal | null>(null);
    const [selectedCashbox, setSelectedCashbox] = useState<SelectItem | null>(null);
    const [selectedDate, setSelectedDate] = useState(today);
    const [time, setTime] = useState(format(getTime(today), 'HH:mm'));
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [selectedEventsId, setSelectedEventsId] = useState<number[]>([]);
    const [selectedServicesId, setSelectedServicesId] = useState<number[]>([]);
    const [selectedEmployeesId, setSelectedEmployeesId] = useState<number[]>([]);
    const [comments, setComments] = useState('');
    const [amount, setAmount] = useState(0);

    const { data: clients } = useGetAllClientsQuery(companyId, { skip: !companyId });
    const { data: employees } = useGetCompanyEmployeesQuery(companyId, { skip: !companyId });
    const { data: events } = useGetCompanyEventsQuery(
        {
            companyId,
            year: getYear(selectedDate),
            month: getMonth(selectedDate),
            day: getDate(selectedDate),
        },
        { refetchOnMountOrArgChange: true, skip: !companyId }
    );
    const { data: services } = useGetServicesQuery({ companyId }, { skip: !companyId });
    const [createClientMutation, { isLoading: isClientAddLoading }] = useCreateClientMutation();
    const [addServiceTransaction] = useAddServiceTransactionMutation();
    const [addSellTransaction] = useAddSellTransactionMutation();

    const isServiceWay = way === 1;

    const handleWaySelect = (id: number) => setWay(id);

    const handleServicesWaySelect = (id: number) => {
        if (id === 1) {
            setOpenModal(OpenModal.SERVICE);
        }

        if (id === 2) {
            setOpenModal(OpenModal.EVENT);
        }
    };

    const handleCashboxSelect = (item: SelectItem) => {
        setSelectedCashbox(item);
    };

    const resetEventsSelection = () => {
        setSelectedEventsId([]);
        setSelectedServicesId([]);
        setAmount(0);
        setSelectedEmployeesId([]);
    };

    const handleDateSelect = (date: Date) => {
        resetEventsSelection();
        setSelectedDate(date);
    };

    const handleTimeSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    };

    const handleClientSelect = (id: number) => {
        setSelectedClientId(id);
        setOpenModal(null);

        if (selectedEventsId.length > 0) setSelectedEventsId([]);
    };

    const handleClientRemove = () => {
        setSelectedClientId(null);
        resetEventsSelection();
    };

    const handleEventSelect = (id: number) => {
        if (selectedServicesId.length > 0) setSelectedServicesId([]);

        setSelectedEventsId(p =>
            p.includes(id) ? p.filter(eventId => eventId !== id) : [...p, id]
        );
    };

    const handleServicesSelect = (id: number) => {
        if (selectedEventsId.length > 0) setSelectedEventsId([]);

        setSelectedServicesId(p =>
            p.includes(id) ? p.filter(eventId => eventId !== id) : [...p, id]
        );
    };

    const modalTitle = 'Доход' + `${way === 1 ? ' з послуги' : way === 2 ? ' з продажу' : ''}`;

    const closeModal = () => setOpenModal(null);

    const handleAddClient = async (state: Client) => {
        if (!companyId) {
            return;
        }

        const data = Object.fromEntries(Object.entries(state).filter(i => i[1] !== ''));

        const result = await createClientMutation({
            data,
            companyId: +companyId,
        }).unwrap();

        if (result) {
            setSelectedClientId(result.id);
            closeModal();
            toast.success('Нового клієнта успішно збережено');
        }
    };

    const client = clients?.find(({ id }) => id === selectedClientId);
    const clientName = client ? client.firstName + ' ' + client.lastName : 'Не обрано';

    const clientEvents = events?.filter(
        ({ year, month, day, client }) =>
            isSameDay(startOfDay(selectedDate), startOfDay(new Date(year, month, day))) &&
            client.id === selectedClientId
    );

    const getEventServicesNames = (services: ServiceBasicInfo[]) => {
        return services.reduce((acc: string, { name }, i) => {
            return i === 0
                ? name
                : i === 1
                ? acc + ', ' + name
                : i === 2
                ? acc + ` +${services.length - 2}`
                : acc;
        }, '');
    };

    const getEventInfoString = ({ services, time }: EventType) =>
        `${getEventServicesNames(services as ServiceBasicInfo[])} на ${time.from}`;

    const selectedEvents = clientEvents?.filter(({ id }) => selectedEventsId.includes(id));
    const selectedServices = services?.filter(({ id }) => selectedServicesId.includes(id));

    const selectedEventsInputValue =
        selectedServicesId.length > 0 && selectedServices
            ? getEventServicesNames(selectedServices)
            : clientEvents &&
              selectedEventsId.length === 1 &&
              selectedEvents &&
              selectedEvents.length
            ? getEventInfoString(selectedEvents[0])
            : `Обрано записів: ${selectedEventsId.length}`;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'amount') {
            setAmount(+value);
        }

        if (name === 'comments') {
            setComments(value);
        }
    };

    const handleEventsAdd = () => {
        setOpenModal(null);

        console.log('selectedEvents: ', selectedEvents);

        const data = selectedEvents?.reduce(
            (acc: { amount: number; employees: number[] }, { amount, employee }) => {
                acc.amount += amount;
                acc.employees.push(employee.id);
                return acc;
            },
            { amount: 0, employees: [] }
        );

        data && setAmount(data.amount);
        data && setSelectedEmployeesId(data.employees);
    };

    const handleServiceAdd = () => {
        setOpenModal(null);

        const amount = selectedServices?.reduce((acc: number, { price }) => {
            return (acc += price);
        }, 0);

        amount && setAmount(amount);
    };

    const providers =
        employees?.filter(({ services }) => services.some(id => selectedServicesId.includes(id))) ||
        [];

    const employeesNames =
        employees
            ?.filter(({ id }) => selectedEmployeesId.includes(id))
            .reduce((acc: string, { firstName, lastName }, i) => {
                const fullName = firstName + ' ' + lastName;

                return i === 0
                    ? fullName
                    : i === 1
                    ? acc + ', ' + fullName
                    : i === 2
                    ? acc + ` +${providers.length - 2}`
                    : acc;
            }, '') || 'Виконавці не обрано';

    const handleEmployeesSelect = (id: number) => {
        setSelectedEmployeesId(p =>
            p.includes(id) ? p.filter(selected => selected !== id) : [...p, id]
        );
    };

    const handleEmployeesRemove = () => setSelectedEmployeesId([]);

    useEffect(() => {
        setSelectedEventsId([]);
        setSelectedEmployeesId([]);
        setComments('');
    }, [selectedDate]);

    useEffect(() => {
        if (!selectedClientId) {
            setSelectedEventsId([]);
            setSelectedEmployeesId([]);
            setComments('');
        }
    }, [selectedClientId]);

    useEffect(() => {
        if (!providers || providers.length > 1) setSelectedEmployeesId([]);

        setSelectedEmployeesId(providers.map(({ id }) => id));
    }, [selectedServicesId]);

    const addDisabled = !selectedCashbox || !selectedDate || !time || amount === 0;

    const eventsOrServicesNotSelected =
        selectedServicesId.length === 0 ? selectedEventsId.length === 0 : false;

    const addServiceIncomeDisabled =
        addDisabled ||
        !selectedClientId ||
        eventsOrServicesNotSelected ||
        selectedEmployeesId.length === 0;

    const addSellIncomeDisabled = addDisabled || comments === '';

    const handleIncomeAdd = async () => {
        const creator = employees?.find(({ userId }) => userId === user?.id)?.id;

        if (!user || !creator || !selectedCashbox || !selectedCashbox.id) return;

        const year = getYear(selectedDate);
        const month = getMonth(selectedDate);
        const day = getDate(selectedDate);

        let data = {
            year,
            month,
            day,
            time: getTimeInMilliseconds(time),
            amount,
            cashbox: +selectedCashbox.id,
            creator,
        };

        let resp: TransactionBasicInfo | null = null;

        if (isServiceWay && selectedClientId && selectedEmployeesId.length > 0) {
            if (selectedEventsId.length > 0) {
                data = Object.assign(data, {
                    events: selectedEventsId,
                });
            }

            if (selectedServicesId.length > 0) {
                data = Object.assign(data, {
                    services: selectedEventsId,
                });
            }

            if (comments !== '') {
                data = Object.assign(data, {
                    comments,
                });
            }

            const dto = {
                companyId,
                data: { ...data, client: selectedClientId, employees: selectedEmployeesId },
            };

            resp = await addServiceTransaction(dto).unwrap();
        } else {
            if (selectedClientId) {
                data = Object.assign(data, { client: selectedClientId });
            }

            const dto = {
                companyId,
                data: { ...data, comments },
            };

            resp = await addSellTransaction(dto).unwrap();
        }

        if (resp) {
            toast.success('Доход зараховано');
            handleModalClose();
        }
    };

    const handleBackClick = () => {
        setSelectedCashbox(null);
        setSelectedClientId(null);
        resetEventsSelection();
        setWay(null);
    };

    return (
        <>
            <Modal
                id="incomeModal"
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

                        <FormInputsListItem>
                            <FormInputLabel>
                                Клієнт {isServiceWay && <Required>{' (!)'}</Required>}
                            </FormInputLabel>

                            <ClientsInputBox $isClient={Boolean(selectedClientId)}>
                                <FormInput
                                    type="text"
                                    name="client"
                                    value={clientName}
                                    onClick={() => setOpenModal(OpenModal.CLIENT)}
                                    readOnly
                                />

                                <SearchIcon id="SearchIcon" as={HiSearch} />

                                <Button
                                    id="removeItem"
                                    Icon={HiX}
                                    onClick={handleClientRemove}
                                    $colors="danger"
                                    $variant="text"
                                    $round
                                />
                            </ClientsInputBox>
                        </FormInputsListItem>

                        {isServiceWay && (
                            <>
                                <FormInputsListItem>
                                    <FormInputLabel>
                                        Запис / послуга <Required>{' (!)'}</Required>
                                    </FormInputLabel>

                                    <ClientsInputBox
                                        $isClient={Boolean(
                                            selectedEventsId.length || selectedServicesId.length
                                        )}
                                    >
                                        <FormInput
                                            type="text"
                                            name="event"
                                            value={
                                                selectedEventsId.length > 0 ||
                                                selectedServicesId.length > 0
                                                    ? selectedEventsInputValue
                                                    : 'Не обрано'
                                            }
                                            onClick={() =>
                                                setOpenModal(
                                                    clientEvents && clientEvents.length > 0
                                                        ? OpenModal.CHOSE_WAY
                                                        : OpenModal.SERVICE
                                                )
                                            }
                                            readOnly
                                        />

                                        <SearchIcon id="SearchIcon" as={HiSearch} />

                                        {(selectedServicesId.length > 0 ||
                                            selectedEventsId.length > 0) && (
                                            <Button
                                                id="removeItem"
                                                Icon={HiX}
                                                onClick={resetEventsSelection}
                                                $colors="danger"
                                                $variant="text"
                                                $round
                                            />
                                        )}
                                    </ClientsInputBox>
                                </FormInputsListItem>

                                <FormInputsListItem>
                                    <FormInputLabel>
                                        Виконавці <Required>{' (!)'}</Required>
                                    </FormInputLabel>

                                    <ClientsInputBox
                                        $isClient={Boolean(selectedEmployeesId.length > 0)}
                                    >
                                        <FormInput
                                            disabled={selectedServicesId.length === 0}
                                            type="text"
                                            name="employees"
                                            value={employeesNames}
                                            onClick={() => setOpenModal(OpenModal.EMPLOYEES)}
                                            readOnly
                                        />

                                        <SearchIcon id="SearchIcon" as={HiSearch} />

                                        {selectedEventsId.length === 0 && (
                                            <Button
                                                id="removeItem"
                                                Icon={HiX}
                                                onClick={handleEmployeesRemove}
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
                            type="price"
                            name="amount"
                            value={amount}
                            handleChange={handleChange}
                        />

                        <CustomFormInput
                            isRequired={!isServiceWay}
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
                                disabled={
                                    isServiceWay ? addServiceIncomeDisabled : addSellIncomeDisabled
                                }
                                children="Зберегти"
                                Icon={IoIosSave}
                                $colors="accent"
                                onClick={handleIncomeAdd}
                            />
                        </AddButtonBox>
                    </Form>
                )}
            </Modal>

            {openModal === OpenModal.CLIENT && clients && clients.length > 0 && (
                <Modal
                    $w={LIST_MODAL_WIDTH}
                    $isOpen={openModal === OpenModal.CLIENT}
                    id="findClient"
                    closeModal={closeModal}
                    title="Вибір клієнта"
                >
                    <ModalContentBox>
                        <ListBox>
                            <ItemsList
                                items={clients.map(
                                    ({ id, firstName, lastName, avatar = '', phone }) => ({
                                        id,
                                        avatar,
                                        name: firstName + ' ' + lastName,
                                        phone,
                                    })
                                )}
                                keyForSearch="phone"
                                nameColumnTitle="Ім'я"
                                onItemClick={handleClientSelect}
                                onAddClick={() => setOpenModal(OpenModal.ADD_CLIENT)}
                                addButtonTitle="Новий клієнта"
                            />
                        </ListBox>
                    </ModalContentBox>
                </Modal>
            )}

            {openModal === OpenModal.ADD_CLIENT && (
                <Modal
                    $isOpen={openModal === OpenModal.ADD_CLIENT}
                    id="addNewClient"
                    closeModal={closeModal}
                    title="Новий клієнт"
                >
                    <ClientForm
                        type="add"
                        initialState={addClientInitialState}
                        onSubmit={handleAddClient}
                        isLoading={isClientAddLoading}
                    />
                </Modal>
            )}

            {openModal === OpenModal.CHOSE_WAY && (
                <Modal
                    $w="500px"
                    $isOpen={openModal === OpenModal.CHOSE_WAY}
                    id="choseWay"
                    closeModal={closeModal}
                    title="Обрати послугу чи запис"
                >
                    <ChoseWay ways={servicesWays} setWay={handleServicesWaySelect} />
                </Modal>
            )}

            {openModal === OpenModal.SERVICE && services && services.length > 0 && (
                <Modal
                    $w={LIST_MODAL_WIDTH}
                    $isOpen={openModal === OpenModal.SERVICE}
                    id="findService"
                    closeModal={closeModal}
                    title="Вибір послуги"
                >
                    <ModalContentBox $isButtons>
                        <ListBox>
                            <ItemsList
                                items={services.map(({ id, name, price }) => ({
                                    id,
                                    name,
                                    price,
                                }))}
                                onItemClick={handleServicesSelect}
                                selection={selectedServicesId}
                            />
                        </ListBox>

                        <AddButtonBox>
                            <Button
                                disabled={selectedServicesId.length === 0}
                                children={
                                    'Додати' +
                                    (selectedServicesId.length > 0
                                        ? `: ${selectedServicesId.length}`
                                        : '')
                                }
                                Icon={HiPlus}
                                $colors="accent"
                                onClick={handleServiceAdd}
                            />
                        </AddButtonBox>
                    </ModalContentBox>
                </Modal>
            )}

            {openModal === OpenModal.EMPLOYEES && employees && employees.length > 0 && (
                <Modal
                    $w={LIST_MODAL_WIDTH}
                    $isOpen={openModal === OpenModal.EMPLOYEES}
                    id="findEmployees"
                    closeModal={closeModal}
                    title="Вибір виконавців"
                >
                    <ModalContentBox $isButtons>
                        <ListBox>
                            <ItemsList
                                items={providers.map(
                                    ({ id, firstName, lastName, jobTitle, avatar }) => {
                                        const name = firstName + ' ' + lastName;

                                        return {
                                            id,
                                            name,
                                            jobTitle,
                                            avatar,
                                        };
                                    }
                                )}
                                onItemClick={handleEmployeesSelect}
                                selection={selectedEmployeesId}
                                nameColumnTitle="Ім'я"
                                keyForSelect="jobTitle"
                            />
                        </ListBox>

                        <AddButtonBox>
                            <Button
                                disabled={selectedEmployeesId.length === 0}
                                children={
                                    'Додати' +
                                    (selectedEmployeesId.length > 0
                                        ? `: ${selectedEmployeesId.length}`
                                        : '')
                                }
                                Icon={HiPlus}
                                $colors="accent"
                                onClick={handleServiceAdd}
                            />
                        </AddButtonBox>
                    </ModalContentBox>
                </Modal>
            )}

            {openModal === OpenModal.EVENT &&
                events &&
                events.length > 0 &&
                clientEvents &&
                clientEvents.length > 0 && (
                    <Modal
                        $w={LIST_MODAL_WIDTH}
                        $isOpen={openModal === OpenModal.EVENT}
                        id="findEvent"
                        closeModal={closeModal}
                        title="Вибір запису"
                    >
                        <ModalContentBox $isButtons>
                            <ItemsList
                                items={clientEvents.map(({ id, time, amount, services }) => ({
                                    id,
                                    name: getEventServicesNames(services as ServiceBasicInfo[]),
                                    time: time.from,
                                    price: amount,
                                }))}
                                onItemClick={handleEventSelect}
                                selection={selectedEventsId}
                            />

                            <AddButtonBox>
                                <Button
                                    disabled={selectedEventsId.length === 0}
                                    children={
                                        'Обрати' +
                                        (selectedEventsId.length > 0
                                            ? `: ${selectedEventsId.length}`
                                            : '')
                                    }
                                    $colors="accent"
                                    onClick={handleEventsAdd}
                                />
                            </AddButtonBox>
                        </ModalContentBox>
                    </Modal>
                )}
        </>
    );
};

export default IncomeModal;
