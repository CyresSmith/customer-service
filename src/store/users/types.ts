export type Tokens = {
    accessToken: string,
    refreshToken: string
};

export type User = {
    firstName?: string,
    lastName?: string,
    phone?: string,
    id: number,
    email: string,
    verify: boolean,
    avatar?: string
};

export type UsersState = {
    user: User | null,
    isLoading: boolean,
    isLoggedIn: boolean,
    error: unknown,
    verify: boolean | undefined
};