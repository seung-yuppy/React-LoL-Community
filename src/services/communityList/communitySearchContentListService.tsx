import fetchGet from "../../util/fetchGet"

const fetchSearchContentCommunityList = (content: string) => {
  return fetchGet(`http://localhost:8080/community/search2/${content}`)
};

export default fetchSearchContentCommunityList;