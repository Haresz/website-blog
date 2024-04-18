import axios from "axios";
const token =
  "9d6f0f34d59ab2f5e59a5344a3c46693b8fefe32d6e2242060d1cf76c95f7f9b";

export function getDataBlog() {
  return axios.get(`https://gorest.co.in/public/v2/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getDetailBlog(id: any) {
  return axios.get(`https://gorest.co.in/public/v2/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getComentsBlogs(id: any) {
  return axios.get(`https://gorest.co.in/public/v2/posts/${id}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
// export function addBlogs(id: any) {
//   return axios.get(`https://gorest.co.in/public/v2/posts/${id}/comments`);
// }
