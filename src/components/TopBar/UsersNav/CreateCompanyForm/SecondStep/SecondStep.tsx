import translateActivityName from 'helpers/translateActivityName';
import { Activity } from 'store/company/company.types';
import BackButton from '../Buttons/BackButton';
import NextButton from '../Buttons/NextButton';
import { ButtonBox, Title } from '../CreateCompanyForm.styled';
import { stepProps } from '../CreateCompanyForm.types';
import { CategoriesList, Category } from '../FirstStep/FirstStep.styled';

interface Props extends stepProps {
    activities: Activity[];
}

const SecondStep = ({ companyData, setCompanyData, nextPage, prevPage, activities }: Props) => {
    const handleSelect = (id: number) => {
        setCompanyData(p => {
            return p.activities.includes(id)
                ? { ...p, activities: p.activities.filter(item => item !== id) }
                : { ...p, activities: [...p.activities, id] };
        });
    };

    const handleBackClick = () => {
        setCompanyData(p => ({ ...p, activities: [] }));
        prevPage();
    };

    return (
        <>
            <Title>Виберіть спеціалізації</Title>

            <CategoriesList>
                {activities.map(item => (
                    <Category
                        selected={companyData.activities.includes(item.id)}
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                    >
                        {translateActivityName(item.name)}
                    </Category>
                ))}
            </CategoriesList>

            <ButtonBox>
                <BackButton onClick={handleBackClick} />

                <NextButton disabled={companyData.activities.length === 0} onClick={nextPage} />
            </ButtonBox>
        </>
    );
};

export default SecondStep;
