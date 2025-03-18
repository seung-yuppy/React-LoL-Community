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
    hatesCount: number;
};

export default IComment;
