import { Dispatch, SetStateAction } from 'react';
import { CreateCompanyDto } from 'services/types/company.types';

export type Selected = {
  selected: boolean;
};

export interface SelectedItem extends Selected {
  $itemsCount: number;
}

export type Step = 1 | 2 | 3 | 4;

export type NextStep = '+' | '-';

export type stepProps = {
  companyData: CreateCompanyDto;
  setCompanyData: Dispatch<SetStateAction<CreateCompanyDto>>;
  nextPage: () => void;
  prevPage: () => void;
};
