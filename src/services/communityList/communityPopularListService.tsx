import fetchGet from "../../util/fetchGet"

// 커뮤니티 인기순 불러오기
const fetchPopoularCommunityList = () => {
  return fetchGet("https://render-host-rw27.onrender.com/community/popularity")
};

export default fetchPopoularCommunityList;