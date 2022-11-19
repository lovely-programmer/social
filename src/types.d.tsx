export type User = {
  username: string;
  password: string;
  email: string;
}

export type ProfileUser = {
  id: number;
  email: string;
  username: string;
  coverPicture: any;
  profilePicture: any;
  website: string;
  city: string;
}

export type Post = {
  id: number;
  userId: number;
  desc: string;
  image: string;
  username: string;
  createdAt: Date | null;
}

export type CreatePost = {
  desc: string;
  image: string;
}

export type CreateComment = {
  desc: string;
  postId: number;
}

export type Comment = {
  id: number;
  desc: string;
  username: string;
  profilePicture: string;
  createdAt: Date | null;
}

export type Like = {
  postId: string;
}