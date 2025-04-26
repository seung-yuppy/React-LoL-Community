import fetchGet from "../../util/fetchGet"

const fetchSearchContentCommunityList = (content: string, page: number = 0) => {
  return fetchGet(`http://localhost:8080/community/search2/${content}?page=${page}`)
};

export default fetchSearchContentCommunityList;