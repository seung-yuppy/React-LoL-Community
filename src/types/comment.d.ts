type IComment = {
  id: number;
  children: IComment[];
  communityId: number;
  communityTitle: string;
  nickname: string;
  content: string;
  createdAt: string;
  updateAt: string;
  likesCount: number;
  imageUrl: string;
};

export default IComment;
