import fetchGet from "../../util/fetchGet";

const fetchSearchNicknameCommunityList = (nickname: string, page: number = 0) => {
  return fetchGet(`http://localhost:8080/community/search3/${nickname}?page=${page}`)
};

export default fetchSearchNicknameCommunityList;