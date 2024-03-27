export type User = {
  id: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
  verify: boolean;
  avatar?: string;
};

export type UserData = Omit<User, 'verify'>;

export type Auth = {
  password: string;
  confirm: string;
  newPassword: string;
};

export type UserRegister = Omit<User, 'verify' | 'id'> &
  Pick<Auth, 'password' | 'confirm'>;

export type UserLogin = Pick<User, 'email'> & Pick<Auth, 'password'>;

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

export type RegisterResponse = {
  user: User;
  message: string;
};

export type AuthState = Omit<UserState, 'isLoggedIn'>;

export type TokenState = Pick<UserState, 'accessToken' | 'refreshToken'>;

export type UpdateUser = {
  data: Partial<User>;
  id: number;
};

export type UploadAvatar = {
  data: FormData;
  id: number;
};

export type UpdatePassword = {
  id: number;
  data: {
    password: string;
    newPassword: string;
  };
};
