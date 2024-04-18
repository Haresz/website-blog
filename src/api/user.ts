import axios from "axios";

export function getDataUser() {
  return axios.get(`https://gorest.co.in/public/v2/users`);
}
