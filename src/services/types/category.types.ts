import { ServiceTypeEnum } from 'helpers/enums';
import { Activity } from 'store/company/company.types';

export type CategoryType = 'employee' | 'service' | 'product' | 'activity';

export type Category = {
  id: number;
  name: string;
  type?: CategoryType;
};

export type ServiceCategory = {
  id: number;
  name: string;
  type: ServiceTypeEnum;
};

export type CompanyCategory = {
  id: number;
  name: string;
  activities: Activity[];
};

export type CreateCategoryDto = Pick<Category, 'name' | 'type'>;
