import fetchGet from "../../util/fetchGet"

const fetchSearchTitleContentCommunityList = (searchParam: string, page: number = 0) => {
  return fetchGet(`http://localhost:8080/community/search?title=${searchParam}&content=${searchParam}&page=${page}`)
};

export default fetchSearchTitleContentCommunityList;