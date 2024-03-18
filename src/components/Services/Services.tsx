import { Message } from 'components/CompanyProfile/RemovePhoneModal/RemovePhoneModal.styled';
import Button from 'components/Ui/Buttons/Button';
import { SelectItem } from 'components/Ui/Form/types';
import { AvatarBox } from 'components/Ui/Modal/ModalHeaderWithAvatar/ModalHeaderWithAvatar.styled';
import { ServiceOpenModal } from 'helpers/enums';
import { millisecondsToTime } from 'helpers/millisecondsToTime';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { HiPhoto } from 'react-icons/hi2';
import { TbArrowsSort } from 'react-icons/tb';
import { ServiceBasicInfo } from 'services/types/service.type';
import {
  ItemBox,
  ItemParam,
  List,
  ListHeader,
  ListHeaderItem,
  Name,
} from './Services.styled';

type Props = {
  handleModalOpen: (type: ServiceOpenModal | null, serviceId?: number) => void;
  filter: string;
  selectedCategory: SelectItem[];
};

enum SortTypeEnum {
  ASC = 'asc',
  DESC = 'desc',
  NULL = null,
}

const listHeaderItems = [
  { id: 'name', title: 'Назва' },
  { id: 'category', title: 'Категорія' },
  { id: 'type', title: 'Тип' },
  { id: 'duration', title: 'Тривалість' },
  { id: 'price', title: 'Вартість' },
];

const initialSortState = {
  name: SortTypeEnum.NULL,
  category: SortTypeEnum.NULL,
  type: SortTypeEnum.NULL,
  duration: SortTypeEnum.NULL,
  price: SortTypeEnum.NULL,
};

const Services = ({
  handleModalOpen,
  filter = '',
  selectedCategory,
}: Props) => {
  const { services } = useCompany();
  const [visibleServices, setVisibleServices] = useState(services);
  const [sortState, setSortState] = useState(initialSortState);

  const handleSort = (key: keyof typeof sortState) => {
    setSortState(p => ({
      ...p,
      [key]:
        p[key] === SortTypeEnum.NULL
          ? SortTypeEnum.ASC
          : p[key] === SortTypeEnum.ASC
          ? SortTypeEnum.DESC
          : SortTypeEnum.NULL,
    }));
  };

  const compare = (
    a: ServiceBasicInfo,
    b: ServiceBasicInfo,
    key: keyof typeof sortState,
    desc = false
  ) => {
    const paramA =
      key === 'category'
        ? a[key].name.toLowerCase()
        : key === 'name'
        ? a[key].toLowerCase()
        : a[key];

    const paramB =
      key === 'category'
        ? b[key].name.toLowerCase()
        : key === 'name'
        ? b[key].toLowerCase()
        : b[key];

    let result = paramA < paramB ? '0' : null;
    if (!result) result = paramA > paramB ? '2' : '0';
    if (desc) result = ['2', '1', '0'][+result];

    return result;
  };

  const sort = () => {
    const nullSorting = Object.values(sortState).findIndex(item => item) === -1;

    setVisibleServices(p =>
      nullSorting
        ? services
        : [...p].sort((a, b) => {
            let first = '';
            let second = '';

            const sorting = Object.entries(sortState).filter(item => item[1]);

            for (const [key, sort] of sorting) {
              first += compare(
                a,
                b,
                key as keyof typeof sortState,
                sort === SortTypeEnum.DESC
              );
              second += compare(
                b,
                a,
                key as keyof typeof sortState,
                sort === SortTypeEnum.DESC
              );
            }

            return first < second ? -1 : first > second ? 1 : 0;
          })
    );
  };

  const filteredServices = (filter: string, services: ServiceBasicInfo[]) => {
    return filter
      ? services.filter(({ name }) => {
          return name.toLowerCase().includes(filter);
        })
      : services;
  };

  const filtered = filteredServices(filter, visibleServices);

  useEffect(() => {
    sort();
  }, [sortState]);

  useEffect(() => {
    setVisibleServices(services);
  }, [services]);

  useEffect(() => {
    if (selectedCategory.findIndex(({ id }) => id === 'all') !== -1) {
      setVisibleServices(services);
    } else {
      setVisibleServices(
        services.filter(
          ({ category }) =>
            selectedCategory.findIndex(item => item.id === category.id) !== -1
        )
      );
    }
    setSortState(initialSortState);
  }, [selectedCategory]);

  return (
    <>
      {services.length === 0 || (filter !== '' && filtered.length === 0) ? (
        <Message>
          {filter !== '' && filtered.length === 0
            ? 'Послуги не знайдені'
            : 'Перелік послуг порожній'}
        </Message>
      ) : (
        <>
          <ListHeader>
            <ListHeaderItem></ListHeaderItem>

            {listHeaderItems.map(({ id, title }) => (
              <ListHeaderItem key={id}>
                <Button
                  onClick={() => handleSort(id as keyof typeof sortState)}
                  $variant="text"
                  size="s"
                  $colors="light"
                  Icon={
                    sortState[id as keyof typeof sortState] === SortTypeEnum.ASC
                      ? HiSortAscending
                      : sortState[id as keyof typeof sortState] ===
                        SortTypeEnum.DESC
                      ? HiSortDescending
                      : TbArrowsSort
                  }
                  $iconPosition="r"
                >
                  {title}
                </Button>
              </ListHeaderItem>
            ))}
          </ListHeader>
          {services && services.length > 0 && (
            <List>
              {filtered.map(
                ({ id, name, avatar, category, type, duration, price }) => (
                  <ItemBox
                    key={id}
                    onClick={() =>
                      handleModalOpen(ServiceOpenModal.EDIT_SERVICE, id)
                    }
                  >
                    <AvatarBox>
                      {avatar ? (
                        <img src={avatar} alt={`${name} image`} />
                      ) : name ? (
                        <span>{name.slice(0, 1)}</span>
                      ) : (
                        <HiPhoto />
                      )}
                    </AvatarBox>

                    <ItemParam>
                      <Name>{name}</Name>
                    </ItemParam>

                    <ItemParam>{category.name}</ItemParam>

                    <ItemParam>
                      {type === 'group' ? 'Групова' : 'Індівідуальна'}
                    </ItemParam>

                    <ItemParam>{millisecondsToTime(duration)}</ItemParam>

                    <ItemParam>{price} грн</ItemParam>
                  </ItemBox>
                )
              )}
            </List>
          )}
        </>
      )}
    </>
  );
};

export default Services;
