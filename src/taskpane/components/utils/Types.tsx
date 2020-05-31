export enum OverlayState {
  NONE,
  ERROR,
  MESSAGE,
  LOADING
}

export interface LoginApiResponse {
  token?: string;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Company {
  company: string;
  url: string;
  text: string;
}

export interface FullUser {
  data: User;
  ad: Company;
}
