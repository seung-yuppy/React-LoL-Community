import fetchGet from "../../util/fetchGet";

const fetchSearchNicknameCommunityList = (nickname: string, page: number = 0) => {
  return fetchGet(`https://render-host-rw27.onrender.com/community/search3/${nickname}?page=${page}`)
};

export default fetchSearchNicknameCommunityList;