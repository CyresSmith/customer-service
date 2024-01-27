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
    address: '',
    phones: [],
    workingHours: {
      monday: { from: 9, to: 18 },
      tuesday: { from: 9, to: 18 },
      thursday: { from: 9, to: 18 },
      wednesday: { from: 9, to: 18 },
      friday: { from: 9, to: 18 },
      saturday: { from: 0, to: 0 },
      sunday: { from: 0, to: 0 },
    },
    desc: '',
    category: '',
    activities: [],
    branches: '',
    employeesCount: '',
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
