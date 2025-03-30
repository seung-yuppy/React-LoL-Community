import fetchGetData from "../../util/fetchGetData";

// 커뮤니티 글 불러오기
const fetchCommunity = (communityId: string) => {
  return fetchGetData(`http://localhost:8080/community/${communityId}`)
};

export default fetchCommunity