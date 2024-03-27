import {
  CategoriesList,
  Category,
} from 'components/TopBar/UsersNav/CreateCompanyForm/FirstStep/FirstStep.styled';
import Button from 'components/Ui/Buttons/Button';
import Loader from 'components/Ui/Loader';
import translateActivityName from 'helpers/translateActivityName';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { HiQueueList } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import {
  useGetCompanyActivitiesQuery,
  useUpdateCompanyProfileMutation,
} from 'services/company.api';
import { ModalBox } from '../CompanyProfile.styled';
import { ButtonBox } from '../SetScheduleModal/SetScheduleModal.styled';

type Props = { closeModal: () => void };

const EditActivitiesModal = ({ closeModal }: Props) => {
  const { id, activities } = useCompany();
  const { updateCompanyData } = useActions();
  const { data: activitiesData, isLoading: categoryLoading } =
    useGetCompanyActivitiesQuery(id);

  const [uploadActivities, { isLoading, isSuccess }] =
    useUpdateCompanyProfileMutation();

  const [activitiesState, setActivitiesState] = useState(
    activities.map(({ id }) => id)
  );

  const handleSelect = (id: number) => {
    setActivitiesState(p => {
      return p.includes(id) ? [...p.filter(item => item !== id)] : [...p, id];
    });
  };

  const handleCategoryUpdate = async () => {
    const data = {
      activities: activitiesState,
    };

    const { message } = await uploadActivities({ id, data }).unwrap();

    if (message && activitiesData) {
      updateCompanyData({
        activities: activitiesData.filter(({ id }) =>
          activitiesState.includes(id)
        ),
      });

      closeModal();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Напрямки діяльності оновлено');
    }
  }, [isSuccess]);

  return (
    <>
      {categoryLoading && <Loader />}

      {!categoryLoading && activitiesData && (
        <ModalBox>
          <CategoriesList>
            {activitiesData.map(item => (
              <Category
                key={item.id}
                selected={activitiesState.includes(item.id)}
                onClick={() => handleSelect(item.id)}
              >
                {translateActivityName(item.name)}
              </Category>
            ))}
          </CategoriesList>

          <ButtonBox>
            <Button
              isLoading={isLoading}
              onClick={handleCategoryUpdate}
              disabled={isLoading}
              Icon={HiQueueList}
              $colors="accent"
            >
              Оновити напрямки
            </Button>
          </ButtonBox>
        </ModalBox>
      )}
    </>
  );
};

export default EditActivitiesModal;
