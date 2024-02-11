type Gender = 'male' | 'female' | 'other' | undefined;

export type Client = {
  firstName: string;
  lastName?: string;
  phone: string;
  id: number | string;
  email?: string;
  avatar?: string;
  discount?: number | string;
  source?: string;
  comments?: string;
  birthday?: string;
  gender?: Gender;
  card?: string;
  companyId?: number;
};

export type Company = {
  id: number | string;
  name: string;
};

export type ClientsState = {
  choosen: Client;
  allClients: Client[];
};

export type AddClient = {
  data: Partial<Client>,
  companyId: number
};

export type UpdateClient = {
  data: Partial<Client>;
  id: string | number;
};

export type UploadAvatar = {
  data: FormData;
  id: string | number;
};