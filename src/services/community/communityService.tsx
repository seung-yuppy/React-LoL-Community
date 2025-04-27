import fetchGetData from "../../util/fetchGetData";

// 커뮤니티 글 불러오기
const fetchCommunity = (communityId: string) => {
  return fetchGetData(`https://render-host-rw27.onrender.com/community/${communityId}`)
};

export default fetchCommunity