import Loader from 'components/Ui/Loader';
import handleError from 'helpers/errorHandler';
import translateCategoryName from 'helpers/translateCategoryName';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGetCompanyCategoriesQuery } from 'services/categories.api';
import { Activity } from 'store/company/company.types';
import NextButton from '../Buttons/NextButton';
import { ButtonBox, Title } from '../CreateCompanyForm.styled';
import { stepProps } from '../CreateCompanyForm.types';
import { CategoriesList, Category } from './FirstStep.styled';

interface Props extends stepProps {
    setActivities: Dispatch<SetStateAction<[] | Activity[]>>;
}

const FirstStep = ({ companyData, setCompanyData, nextPage, setActivities }: Props) => {
    const { isLoading, isError, error, data } = useGetCompanyCategoriesQuery(null);

    const handleSelect = (id: number) => {
        setCompanyData(p => ({
            ...p,
            category: companyData.category === id ? 0 : id,
        }));

        const activities = data?.find(item => item.id === id)?.activities;

        if (activities) setActivities(activities);
    };

    useEffect(() => {
        if (isError) {
            console.log(error);
            toast.error(handleError(error));
        }
    }, [error, isError]);

    return (
        <>
            <Title>Виберіть сферу діяльності</Title>

            {isLoading && !data && <Loader />}

            {!isLoading && data && data.length > 0 && (
                <CategoriesList>
                    {data.map(item => (
                        <Category
                            selected={companyData.category === item.id}
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                        >
                            {translateCategoryName(item.name)}
                        </Category>
                    ))}
                </CategoriesList>
            )}

            <ButtonBox>
                <NextButton
                    disabled={isLoading || companyData.category === 0}
                    isLoading={isLoading}
                    onClick={nextPage}
                />
            </ButtonBox>
        </>
    );
};

export default FirstStep;
