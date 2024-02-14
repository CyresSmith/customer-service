export type Client = {
  firstName: string;
  lastName?: string;
  phone: string;
  id: number | string;
  email?: string;
  avatar?: string;
  discount?: number | string;
  source?: string;
  comment?: string;
  birthday?: string;
  gender?: string;
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
  companyId: number;
};

export type UploadAvatar = {
  data: FormData;
  id: string | number;
  companyId: number;
};