import axios from "axios";

export function getDataBlog() {
  return axios.get(`https://gorest.co.in/public/v2/posts`);
}

export function getDetailBlog(id: any) {
  return axios.get(`https://gorest.co.in/public/v2/posts/${id}`);
}

export function getComentsBlogs(id: any) {
  return axios.get(`https://gorest.co.in/public/v2/posts/${id}/comments`);
}
