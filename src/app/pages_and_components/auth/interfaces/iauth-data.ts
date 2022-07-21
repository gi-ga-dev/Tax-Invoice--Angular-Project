export interface IAuthData {
  accessToken: string;
  user: {
    email: string;
    firstname: string;
    lastname: string;
    id: number;
  };
}
