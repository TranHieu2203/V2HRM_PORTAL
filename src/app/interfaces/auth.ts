export interface Auth {
    loading: boolean;
    error: boolean;
    message: string;
    data: any;
    loginStatus: number;
    tokenStatus: number;
}