import Axios from "axios";

export function getDataBlog() {
  return Axios.get(`https://gorest.co.in/public/v2/posts`);
}
