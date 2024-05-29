import { MessageCount, OnlineBadge } from 'components/Chat/MessagesList/MessagesList.styled';
import { Message } from 'components/CompanyProfile/RemovePhoneModal/RemovePhoneModal.styled';
import { StatusBadge } from 'components/Employees/EmployeeModal/EmployeeProfile/EmployeeProfile.styled';
import { capitalizeFirstLetter, capitalizeObjectValues } from 'helpers/capitalizeFirstLetter';
import { millisecondsToTime } from 'helpers/millisecondsToTime';
import { translateLabels } from 'helpers/translateLabels';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaGenderless, FaMars, FaVenus } from 'react-icons/fa6';
import { HiCheckCircle, HiPlus, HiSortAscending, HiSortDescending, HiX } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi2';
import { TbArrowsSort } from 'react-icons/tb';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import Button from '../Buttons/Button';
import { FormInput, FormInputLabel, FormInputsListItem } from '../Form/CustomForm.styled';
import CustomFormSelect from '../Form/CustomFormSelect';
import { SelectItem } from '../Form/types';
import ItemAvatar from './ItemAvatar';
import {
    AvatarSize,
    ButtonBox,
    FilterBox,
    ItemBox,
    ItemParam,
    List,
    ListBar,
    ListBox,
    ListHeader,
    ListHeaderItem,
    SearchBox,
} from './ItemsList.styled';

type StringRecord = Record<string, string | number | boolean>;

type ItemType<T extends StringRecord> = {
    id: number;
    name: string;
} & T;

type Props<T extends StringRecord> = {
    items: ItemType<T>[];
    keyForSelect?: keyof Omit<ItemType<T>, 'id' | 'avatar'>;
    keyForSearch?: keyof Omit<ItemType<T>, 'id' | 'avatar'>;
    notSortedKeys?: Array<keyof Omit<ItemType<T>, 'id' | 'avatar'>>;
    onItemClick?: (id: number, selected?: Array<number>) => void;
    onAddClick?: () => void;
    addButtonTitle?: string;
    onItemDeleteClick?: (id: number) => void;
    isDeleteLoading?: boolean;
    selection?: number[] | undefined;
    nameColumnTitle?: string;
    activeItem?: number;
    listHeader?: boolean;
    listSortPanel?: boolean;
    avatarSize?: AvatarSize;
};

enum SortTypeEnum {
    ASC = 'asc',
    DESC = 'desc',
    NULL = 0,
}

const NOT_SORT_KEYS = ['id', 'avatar'];

const ItemsList = <T extends StringRecord>({
    items,
    onItemClick,
    keyForSelect,
    keyForSearch = 'name',
    notSortedKeys = [],
    addButtonTitle,
    onAddClick,
    onItemDeleteClick,
    isDeleteLoading = false,
    selection = undefined,
    nameColumnTitle,
    activeItem,
    listHeader = true,
    listSortPanel = true,
    avatarSize = AvatarSize.M,
}: Props<T>) => {
    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);

    const [itemsState, setItemsState] = useState<ItemType<T>[]>([]);
    const [initialSortState, setInitialSortState] = useState<Record<string, SortTypeEnum>>({});
    const [sortState, setSortState] = useState(initialSortState);
    const [filter, setFilter] = useState<string>('');
    const [selected, setSelected] = useState(selection || []);

    const selectAll = {
        id: 'all',
        value: 'Всі',
        count: 0,
    };

    const initialSelection = [selectAll];

    const [selectedKeys, setSelectedKeys] = useState<SelectItem[]>(initialSelection);

    const handleItemClick = (id: number) => {
        let newSelection: Array<number> | undefined;

        if (selection) {
            newSelection = selected.includes(id)
                ? selected.filter(item => item !== id)
                : [...selected, id];

            setSelected(newSelection);

            selection = newSelection;
        }

        onItemClick && onItemClick(id, newSelection);
    };

    const handleItemDelete = (id: number) => {
        onItemDeleteClick && onItemDeleteClick(id);
    };

    const sort = () => {
        setItemsState(p => {
            const sort = Object.entries(sortState).find(item => item[1] !== SortTypeEnum.NULL);

            if (sort) {
                return [...p].sort((a, b) => {
                    if (sort) {
                        const valueA = a[sort[0]];
                        const valueB = b[sort[0]];

                        if (sort[1] === SortTypeEnum.ASC) {
                            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
                        } else if (sort[1] === SortTypeEnum.DESC) {
                            return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
                        } else {
                            return 0;
                        }
                    } else {
                        return 0;
                    }
                });
            } else {
                const capitalized = items.map(
                    item => capitalizeObjectValues(item) as ItemType<typeof item>
                );

                return keyForSelect &&
                    selectedKeys.findIndex(({ id }) => id === selectAll.id) === -1
                    ? capitalized.filter(
                          item =>
                              Object.values(selectedKeys).findIndex(
                                  ({ value }) => value === String(item[keyForSelect])
                              ) !== -1
                      )
                    : capitalized;
            }
        });
    };

    const handleSort = (sortKey: keyof typeof initialSortState) => {
        if ((notSortedKeys as Array<string>).includes(sortKey)) return;

        setSortState(p => {
            let newState = { ...p };

            for (const key of Object.keys(newState)) {
                newState = Object.assign(newState, { [key]: SortTypeEnum.NULL });
            }

            return {
                ...newState,
                [sortKey]:
                    p[sortKey] === SortTypeEnum.NULL
                        ? SortTypeEnum.ASC
                        : p[sortKey] === SortTypeEnum.ASC
                        ? SortTypeEnum.DESC
                        : SortTypeEnum.NULL,
            };
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value.trim());
    };

    const handleSelect = (item: SelectItem) => {
        if (item.id === selectAll.id) {
            setSelectedKeys(initialSelection);
            setItemsState(items.map(item => capitalizeObjectValues(item) as ItemType<typeof item>));
        } else {
            setSelectedKeys(p => {
                const newState = p.filter(({ id }) => id !== selectAll.id);
                const itemIdx = newState.findIndex(({ id }) => id === item.id);

                return itemIdx === -1
                    ? [...newState, item]
                    : newState.filter(({ id }) => id !== item.id);
            });

            setSortState(initialSortState);
        }
    };

    const selectItems = keyForSelect &&
        items.length > 0 && [
            selectAll,
            ...items.reduce((acc: SelectItem[], item, i) => {
                selectAll.count++;

                const value = capitalizeFirstLetter(
                    translateLabels(String(item[keyForSelect])) || String(item[keyForSelect])
                );

                const existingIndex = acc.findIndex(({ value: val }) => val === value);

                if (existingIndex !== -1 && acc[existingIndex] !== undefined) {
                    acc[existingIndex].count = (acc[existingIndex].count ?? 0) + 1;
                } else {
                    acc.push({
                        id: i,
                        value,
                        count: 1,
                    });
                }

                return acc;
            }, []),
        ];

    const filteredItems =
        filter && itemsState.length > 0
            ? itemsState.filter(item => {
                  return keyForSearch
                      ? String(item[keyForSearch]).toLowerCase().includes(filter)
                      : item.name.toLowerCase().includes(filter);
              })
            : itemsState;

    useEffect(() => {
        if (!items) return;

        setItemsState(items.map(item => capitalizeObjectValues(item) as ItemType<typeof item>));

        if (items.length > 0) {
            let sortState = {};

            for (const key of Object.keys(items[0])) {
                if (
                    !NOT_SORT_KEYS.includes(key) &&
                    !(notSortedKeys as Array<string>).includes(key)
                ) {
                    sortState = Object.assign(sortState, { [key]: SortTypeEnum.NULL });
                }
            }

            setInitialSortState(sortState);
        }
    }, [items]);

    useEffect(() => {
        sort();
    }, [sortState]);

    useEffect(() => {
        if (keyForSelect) {
            const capitalizedItems = items.map(
                item => capitalizeObjectValues(item) as ItemType<typeof item>
            );

            if (selectedKeys.findIndex(({ id }) => id === 'all') !== -1) {
                setItemsState(capitalizedItems);
            } else {
                setItemsState(
                    capitalizedItems.filter(
                        item =>
                            selectedKeys.findIndex(
                                ({ value }) => String(value) === String(item[keyForSelect])
                            ) !== -1
                    )
                );
            }
            setSortState(initialSortState);
        }
    }, [initialSortState, items, keyForSelect, selectedKeys]);

    useEffect(() => {
        if (selectedKeys.length === 0) {
            setSelectedKeys(initialSelection);
        }
    }, [selectedKeys.length]);

    const columnsCount =
        itemsState && itemsState.length > 0
            ? Object.keys(itemsState[0]).filter(key => !NOT_SORT_KEYS.includes(key)).length
            : 0;

    return (
        <ListBox>
            {listHeader && (
                <ListBar>
                    <FilterBox $rowsCount={listHeader && keyForSelect ? 2 : 1}>
                        <FormInputsListItem as="div">
                            <FormInputLabel>Пошук</FormInputLabel>

                            <SearchBox>
                                <FormInput
                                    name="filter"
                                    type="text"
                                    value={filter}
                                    onChange={handleChange}
                                    placeholder={
                                        keyForSearch === 'name'
                                            ? nameColumnTitle
                                                ? `Введіть ${nameColumnTitle}`
                                                : 'Введіть назву'
                                            : translateLabels(String(keyForSearch))
                                    }
                                    disabled={items.length === 0}
                                />

                                <ButtonBox $hideButton={filter === ''}>
                                    <Button
                                        $variant="text"
                                        $colors="danger"
                                        Icon={HiX}
                                        onClick={() => setFilter('')}
                                    />
                                </ButtonBox>
                            </SearchBox>
                        </FormInputsListItem>

                        {keyForSelect && selectItems && (
                            <FormInputsListItem as="div">
                                <FormInputLabel>
                                    {translateLabels(String(keyForSelect))}
                                </FormInputLabel>

                                <CustomFormSelect
                                    disabled={items.length === 0}
                                    selectItems={selectItems}
                                    selectedItem={selectedKeys}
                                    handleSelect={handleSelect}
                                />
                            </FormInputsListItem>
                        )}
                    </FilterBox>

                    {addButtonTitle && onAddClick && (
                        <Button
                            onClick={onAddClick}
                            Icon={HiPlus}
                            $colors="accent"
                            shake={items.length === 0}
                            $round={isMobile ? true : false}
                        >
                            {addButtonTitle}
                        </Button>
                    )}
                </ListBar>
            )}

            {itemsState && itemsState.length > 0 ? (
                <>
                    {filteredItems.length === 0 ? (
                        <Message>Нічого не знайдено</Message>
                    ) : (
                        <>
                            {listSortPanel && (
                                <ListHeader
                                    $columnsCount={columnsCount}
                                    $isDeleteButton={Boolean(onItemDeleteClick)}
                                    $avatarSize={avatarSize}
                                >
                                    <div></div>
                                    {Object.keys(itemsState[0]).map(key => {
                                        if (!NOT_SORT_KEYS.includes(key)) {
                                            return (
                                                <ListHeaderItem key={key}>
                                                    <Button
                                                        onClick={() =>
                                                            handleSort(
                                                                key as keyof typeof sortState
                                                            )
                                                        }
                                                        $variant="text"
                                                        size="s"
                                                        $colors={
                                                            (notSortedKeys as string[]).includes(
                                                                key
                                                            ) ||
                                                            sortState[
                                                                key as keyof typeof sortState
                                                            ] === SortTypeEnum.NULL
                                                                ? 'light'
                                                                : 'accent'
                                                        }
                                                        Icon={
                                                            (
                                                                notSortedKeys as Array<string>
                                                            ).includes(key)
                                                                ? undefined
                                                                : sortState[
                                                                      key as keyof typeof sortState
                                                                  ] === SortTypeEnum.ASC
                                                                ? HiSortAscending
                                                                : sortState[
                                                                      key as keyof typeof sortState
                                                                  ] === SortTypeEnum.DESC
                                                                ? HiSortDescending
                                                                : TbArrowsSort
                                                        }
                                                        $iconPosition="r"
                                                    >
                                                        {capitalizeFirstLetter(
                                                            key === 'name' && nameColumnTitle
                                                                ? nameColumnTitle
                                                                : translateLabels(key) || ''
                                                        )}
                                                    </Button>
                                                </ListHeaderItem>
                                            );
                                        }
                                    })}
                                    {onItemDeleteClick && <div></div>}
                                </ListHeader>
                            )}

                            <List>
                                {filteredItems.map(item => (
                                    <ItemBox
                                        key={item.id}
                                        $isActive={activeItem === item.id}
                                        $selected={selected && selected.includes(+item.id)}
                                        $columnsCount={columnsCount}
                                        $isDeleteButton={Boolean(onItemDeleteClick)}
                                        onClick={() => handleItemClick(+item.id)}
                                        $avatarSize={avatarSize}
                                    >
                                        <HiCheckCircle id="checkLabel" />

                                        <ItemAvatar
                                            avatar={item.avatar?.toString()}
                                            name={item.name}
                                            size={avatarSize}
                                        />

                                        {Object.entries(item).map(([key, value]) => {
                                            if (key === 'status') {
                                                return (
                                                    <ItemParam key={key}>
                                                        <StatusBadge
                                                            $active={value === 'Working'}
                                                            $size="s"
                                                        >
                                                            {value === 'Working'
                                                                ? 'Працює'
                                                                : 'Звільнено'}
                                                        </StatusBadge>
                                                    </ItemParam>
                                                );
                                            }

                                            if (key === 'gender') {
                                                return (
                                                    <ItemParam key={key}>
                                                        {value === 'Male' ? (
                                                            <FaMars size={25} />
                                                        ) : value === 'Female' ? (
                                                            <FaVenus size={25} />
                                                        ) : (
                                                            <FaGenderless size={25} />
                                                        )}
                                                    </ItemParam>
                                                );
                                            }

                                            if (key === 'price') {
                                                return (
                                                    <ItemParam key={key}>
                                                        {value + ' грн'}
                                                    </ItemParam>
                                                );
                                            }

                                            if (key === 'duration') {
                                                return (
                                                    <ItemParam key={key}>
                                                        {millisecondsToTime(+value)}
                                                    </ItemParam>
                                                );
                                            }

                                            if (key === 'isOnline') {
                                                return (
                                                    <ItemParam key={key}>
                                                        {value ? (
                                                            typeof value === 'boolean' ? (
                                                                <OnlineBadge />
                                                            ) : (
                                                                <MessageCount>{value}</MessageCount>
                                                            )
                                                        ) : null}
                                                    </ItemParam>
                                                );
                                            }

                                            if (key !== 'id' && key !== 'avatar') {
                                                return <ItemParam key={key}>{value}</ItemParam>;
                                            }
                                        })}

                                        {onItemDeleteClick && (
                                            <Button
                                                Icon={HiTrash}
                                                $colors="transparent"
                                                $variant="text"
                                                onClick={() => handleItemDelete(item.id)}
                                                isLoading={isDeleteLoading}
                                            />
                                        )}
                                    </ItemBox>
                                ))}
                            </List>
                        </>
                    )}
                </>
            ) : (
                <Message>Перелік порожній!</Message>
            )}
        </ListBox>
    );
};

export default ItemsList;
