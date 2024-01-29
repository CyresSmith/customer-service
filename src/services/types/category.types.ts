export type CategoryType = 'employee' | 'service' | 'product' | 'activity';

export type Category = {
  id: string;
  name: string;
  type: CategoryType;
};

export type Activity = {
  id: string;
  name: string;
};

export type CompanyCategory = {
  id: string;
  name: string;
  activities: Activity[];
};

export type CreateCategoryDto = Pick<Category, 'name' | 'type'>;
