
interface BlogComment {
    user: string;
    comment: string;
  }

interface BlogData {
    _id:string;

    blogId: string
    userId: string;
    title: string;
    author: string;
    dateOfCreation: string;
    blogContent: string;
    blogComments: BlogComment[];
}

  export default BlogData;
