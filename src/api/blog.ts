import axios from "axios";
const token =
  "9d6f0f34d59ab2f5e59a5344a3c46693b8fefe32d6e2242060d1cf76c95f7f9b";

export function getDataBlog(page: number) {
  return axios.get(
    `https://gorest.co.in/public/v2/posts?page=${page}&per_page=4`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export function addBlogs(user_id: number, title: string, body: string) {
  return axios.post(
    `https://gorest.co.in/public/v2/users/${user_id}/posts`,
    {
      user_id,
      title,
      body,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function updateBlogs(blogId: number, title: string, body: string) {
  return axios.patch(
    `https://gorest.co.in/public/v2/posts/${blogId}`,
    {
      title,
      body,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function deleteBlogs(blogId: number) {
  return axios.delete(`https://gorest.co.in/public/v2/posts/${blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
