export interface ICommunity {
  content: {
    id: number;
    nickname: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    viewsCount: number;
    likesCount: number;
    commentsCount: number;
  };
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export interface ITeamImage {
  id: number;
  team: string;
  imageUrl: string;
};

export interface IComment {
  id: number;
  communityId: number;
  communityTitle: string;
  nickname: string;
  content: string;
  createdAt: string;
  updateAt: string;
  likesCount: number;
  hatesCount: number;
};