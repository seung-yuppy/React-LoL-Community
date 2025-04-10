import fetchGet from "../../util/fetchGet"

const fetchSearchTitleContentCommunityList = (searchParam: string) => {
  return fetchGet(`http://localhost:8080/community/search?title=${searchParam}&content=${searchParam}`)
};

export default fetchSearchTitleContentCommunityList;