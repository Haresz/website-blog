import axios from "axios";
const token =
  "092e3426cff176b8392b534bee70aacac44e9c2193907560792a6e052fb67960";

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
