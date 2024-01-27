import { useState } from 'react';
import { Activity } from 'services/types/category.types';
import { CreateCompanyDto } from 'services/types/company.types';
import { FormContainer } from './CreateCompanyForm.styled';
import { NextStep, Step } from './CreateCompanyForm.types';
import FirstStep from './FirstStep';
import FourthStep from './FourthStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

export type Props = {
  closeModal: () => void;
};

const CreateCompanyForm = ({ closeModal }: Props) => {
  const [formStep, setFormStep] = useState<Step>(1);
  const [activities, setActivities] = useState<Activity[] | []>([]);
  const [companyData, setCompanyData] = useState<CreateCompanyDto>({
    name: '',
    city: '',
    address: '',
    index: '',
    phone: '',
    category: '',
    activities: [],
    branches: 'one',
    employeesCount: '2-5',
  });

  const nextStep = (type: NextStep) => {
    if (type === '+') {
      if (formStep === 4) return;
      setFormStep(p => (p + 1) as Step);
    } else {
      if (formStep === 1) return;
      setFormStep(p => (p - 1) as Step);
    }
  };

  const stepProps = {
    companyData,
    setCompanyData,
    nextPage: () => nextStep('+'),
    prevPage: () => nextStep('-'),
  };

  return (
    <FormContainer>
      {formStep === 1 && (
        <FirstStep {...stepProps} setActivities={setActivities} />
      )}
      {formStep === 2 && <SecondStep {...stepProps} activities={activities} />}
      {formStep === 3 && <ThirdStep {...stepProps} />}
      {formStep === 4 && <FourthStep {...stepProps} closeModal={closeModal} />}
    </FormContainer>
  );
};

export default CreateCompanyForm;
