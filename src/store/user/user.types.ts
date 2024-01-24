export type User = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  id: number;
  email: string;
  verify: boolean;
  avatar?: string;
};

export type Company = {
  id: number;
  name: string;
};

export type UserState = {
  user: User | null;
  companies: Company[] | [];
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

export type AuthState = Omit<UserState, 'isLoggedIn'>;

export type TokenState = Pick<UserState, 'accessToken' | 'refreshToken'>;
