export interface Blog {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

export interface User {
  id: number;
  name: string;
  status: string;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}
