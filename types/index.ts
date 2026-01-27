export interface TBlog {
  id: string;
  title: string;
  description: string;
  createAt: string;
  author: authorDetails;
  coverImage: string;
  likes: number;
}

interface authorDetails {
  _id: string;
  email: string;
}
