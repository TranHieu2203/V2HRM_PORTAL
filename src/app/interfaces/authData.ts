export interface AuthData {
    id: number,
    username: string,
    email: string,
    jwtToken: string,
    expire: number,
    refreshToken: string,
    googleProfile: object | null,
    avatarUrl: string | null,
    message: string,
    errorCode: number
}