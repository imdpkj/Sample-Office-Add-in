import { LoginApiResponse, User, FullUser } from "./Types";

const BASE = "https://reqres.in/api";

export default class API {
  static login = async (email: string, password: string): Promise<LoginApiResponse> => {
    const uri = `${BASE}/login`;

    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();

    return data;
  };

  static users = async (page: number = 2): Promise<User[]> => {
    const uri = `${BASE}/users?page=${page}`;

    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    return data.data as User[];
  };

  static user = async (id: number): Promise<FullUser> => {
    const uri = `${BASE}/users/${id}`;

    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    return data as FullUser;
  };
}
