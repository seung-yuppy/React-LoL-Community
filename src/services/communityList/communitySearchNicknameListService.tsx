import fetchGet from "../../util/fetchGet";

const fetchSearchNicknameCommunityList = (nickname: string) => {
  return fetchGet(`http://localhost:8080/community/search3/${nickname}`)
};

export default fetchSearchNicknameCommunityList;