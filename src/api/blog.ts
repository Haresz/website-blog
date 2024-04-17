import axios from "axios";

export function getDataBlog() {
  return axios.get(`https://gorest.co.in/public/v2/posts`);
}
