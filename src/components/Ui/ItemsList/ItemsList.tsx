import { Message } from 'components/CompanyProfile/RemovePhoneModal/RemovePhoneModal.styled';
import { StatusBadge } from 'components/Employees/EmployeeModal/EmployeeProfile/EmployeeProfile.styled';
import {
  capitalizeFirstLetter,
  capitalizeObjectValues,
} from 'helpers/capitalizeFirstLetter';
import { millisecondsToTime } from 'helpers/millisecondsToTime';
import { translateLabels } from 'helpers/translateLabels';
import { useAdminRights } from 'hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  HiPlusCircle,
  HiSortAscending,
  HiSortDescending,
  HiX,
} from 'react-icons/hi';
import { HiPhoto } from 'react-icons/hi2';
import { TbArrowsSort } from 'react-icons/tb';
import Button from '../Buttons/Button';
import { FormInput } from '../Form/CustomForm.styled';
import CustomFormSelect from '../Form/CustomFormSelect';
import { SelectItem } from '../Form/types';
import {
  AvatarBox,
  ButtonBox,
  FilterBox,
  ItemBox,
  ItemParam,
  List,
  ListBar,
  ListHeader,
  ListHeaderItem,
  SearchBox,
} from './ItemsList.styled';

type StringRecord = Record<string, string | number>;

type ItemType<T extends StringRecord> = {
  id: string | number;
  name: string;
} & T;

type Props<T extends StringRecord> = {
  items: ItemType<T>[];
  keyForSelect?: keyof Omit<ItemType<T>, 'id' | 'avatar'>;
  onItemClick: (id: string | number) => void;
  onAddClick: () => void;
  addButtonTitle: string;
};

enum SortTypeEnum {
  ASC = 'asc',
  DESC = 'desc',
  NULL = 0,
}

const ItemsList = <T extends StringRecord>({
  items,
  onItemClick,
  keyForSelect,
  addButtonTitle,
  onAddClick,
}: Props<T>) => {
  const isAdmin = useAdminRights();
  const [itemsState, setItemsState] = useState<ItemType<T>[]>([]);
  const [initialSortState, setInitialSortState] = useState({
    name: SortTypeEnum.NULL,
  });
  const [sortState, setSortState] = useState(initialSortState);
  const [filter, setFilter] = useState<string>('');

  const selectAll = {
    id: 'all',
    value: keyForSelect
      ? `Всі: ${translateLabels(String(keyForSelect))}`
      : 'Обрати всі',
  };

  const initialSelection = [selectAll];

  const [selectedKeys, setSelectedKeys] =
    useState<SelectItem[]>(initialSelection);

  const handleItemClick = (id: string | number) => {
    onItemClick(id);
  };

  const sort = () => {
    setItemsState(p => {
      const sort = Object.entries(sortState).find(
        ([key, value]) => value !== SortTypeEnum.NULL
      );

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
      setItemsState(
        items.map(item => capitalizeObjectValues(item) as ItemType<typeof item>)
      );
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
        const idx = acc.findIndex(
          ({ value }) =>
            value === capitalizeFirstLetter(String(item[keyForSelect]))
        );

        if (idx === -1) {
          acc.push({
            id: i,
            value: capitalizeFirstLetter(String(item[keyForSelect])),
          });
        }

        return acc;
      }, []),
    ];

  const filteredItems =
    filter && itemsState.length > 0
      ? itemsState.filter(({ name }) => {
          return name.toLowerCase().includes(filter);
        })
      : itemsState;

  useEffect(() => {
    if (!items) return;

    setItemsState(
      items.map(item => capitalizeObjectValues(item) as ItemType<typeof item>)
    );

    if (items.length > 0) {
      let sortState = { name: SortTypeEnum.NULL };

      for (const key of Object.keys(items[0])) {
        if (key !== 'id' && key !== 'avatar') {
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
      ? Object.keys(itemsState[0]).length - 2
      : 0;

  return (
    <>
      <ListBar>
        <FilterBox>
          <SearchBox>
            <FormInput
              name="filter"
              type="text"
              value={filter}
              onChange={handleChange}
              placeholder="Пошук"
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

          {keyForSelect && selectItems && (
            <CustomFormSelect
              disabled={items.length === 0}
              width="200px"
              selectItems={selectItems}
              selectedItem={selectedKeys}
              handleSelect={handleSelect}
            />
          )}
        </FilterBox>

        {isAdmin && addButtonTitle && onAddClick && (
          <Button
            onClick={onAddClick}
            Icon={HiPlusCircle}
            $colors="accent"
            shake={items.length === 0}
          >
            {addButtonTitle}
          </Button>
        )}
      </ListBar>

      {itemsState && itemsState.length > 0 ? (
        <>
          {filteredItems.length === 0 ? (
            <Message>Нічого не знайдено</Message>
          ) : (
            <>
              <ListHeader $columnsCount={columnsCount}>
                {Object.keys(itemsState[0]).map(key => {
                  if (key !== 'id' && key !== 'avatar') {
                    return (
                      <ListHeaderItem key={key}>
                        <Button
                          onClick={() =>
                            handleSort(key as keyof typeof sortState)
                          }
                          $variant="text"
                          size="s"
                          $colors="light"
                          Icon={
                            sortState[key as keyof typeof sortState] ===
                            SortTypeEnum.ASC
                              ? HiSortAscending
                              : sortState[key as keyof typeof sortState] ===
                                SortTypeEnum.DESC
                              ? HiSortDescending
                              : TbArrowsSort
                          }
                          $iconPosition="r"
                        >
                          {capitalizeFirstLetter(translateLabels(key) || '')}
                        </Button>
                      </ListHeaderItem>
                    );
                  }
                })}
              </ListHeader>
              <List>
                {filteredItems.map(item => (
                  <ItemBox
                    key={item.id}
                    $columnsCount={columnsCount}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <AvatarBox>
                      {item.avatar ? (
                        <img
                          src={String(item.avatar)}
                          alt={`${item.name} image`}
                        />
                      ) : item.name ? (
                        <span>{item.name.slice(0, 1)}</span>
                      ) : (
                        <HiPhoto />
                      )}
                    </AvatarBox>

                    {Object.entries(item).map(([key, value]) => {
                      if (key === 'status') {
                        return (
                          <ItemParam key={key}>
                            <StatusBadge
                              $active={value === 'Working'}
                              $size="s"
                            >
                              {value === 'Working' ? 'Працює' : 'Звільнено'}
                            </StatusBadge>
                          </ItemParam>
                        );
                      }

                      if (key === 'price') {
                        return (
                          <ItemParam key={key}>{value + ' грн'}</ItemParam>
                        );
                      }

                      if (key === 'duration') {
                        return (
                          <ItemParam key={key}>
                            {millisecondsToTime(+value)}
                          </ItemParam>
                        );
                      }

                      if (key !== 'id' && key !== 'avatar') {
                        return <ItemParam key={key}>{value}</ItemParam>;
                      }
                    })}
                  </ItemBox>
                ))}
              </List>
            </>
          )}
        </>
      ) : (
        <Message>Перелік порожній!</Message>
      )}
    </>
  );
};

export default ItemsList;
