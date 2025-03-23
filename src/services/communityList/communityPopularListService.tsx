import fetchGet from "../../util/fetchGet"

// 커뮤니티 인기순 불러오기
const fetchPopoularCommunityList = () => {
  return fetchGet("http://localhost:8080/community/popularity")
};

export default fetchPopoularCommunityList;