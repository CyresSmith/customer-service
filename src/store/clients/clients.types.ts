export type Client = {
  firstName: string;
  lastName?: string;
  phone: string;
  id: number;
  email?: string;
  avatar?: string;
  discount?: number;
  source?: string;
  comment?: string;
  birthday?: string;
  gender?: string;
  card?: string;
  companyId?: number;
  createdAt?: string;
  // socialLinks?: string[];
};

export type Company = {
  id: number;
  name: string;
};

export type ClientsState = {
  chosen: Client | null;
  allClients: Client[];
};

export type AddClient = {
  data: Partial<Client>;
  companyId: number;
};

export type UpdateClient = {
  data: Partial<Client>;
  id: number;
  companyId: number;
};

export type UploadAvatar = {
  data: FormData;
  id: number;
  companyId: number;
};
