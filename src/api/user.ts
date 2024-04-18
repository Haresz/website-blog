import axios from "axios";
const token =
  "9d6f0f34d59ab2f5e59a5344a3c46693b8fefe32d6e2242060d1cf76c95f7f9b";

export function getDataUser() {
  return axios.get(`https://gorest.co.in/public/v2/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getDetailUser(id: any) {
  return axios.get(`https://gorest.co.in/public/v2/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function registerUser(name: string, email: string, gender: string) {
  return axios.post(
    `https://gorest.co.in/public/v2/users`,
    {
      name,
      email,
      gender,
      status: "active",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
