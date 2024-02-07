export type User = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  id: number | string;
  email: string;
  verify: boolean;
  avatar?: string;
};

export type Company = {
  id: number | string;
  name: string;
};

export type UserState = {
  user: User | null;
  companies: Company[] | [];
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

export type RegisterResponse = {
  user: User;
  message: string;
};

export type AuthState = Omit<UserState, 'isLoggedIn'>;

export type TokenState = Pick<UserState, 'accessToken' | 'refreshToken'>;

export type UpdateUser = {
  data: Partial<User>;
  id: string | number;
};

export type UploadAvatar = {
  data: FormData;
  id: string | number;
};

export type UpdatePassword = {
  id: string | number;
  data: {
    password: string;
    newPassword: string;
  }
}