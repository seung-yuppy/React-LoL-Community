import fetchGet from "../../util/fetchGet";

// 커뮤니티 리스트 불러오기
const fetchCommunityList = () => {
  return fetchGet("http://localhost:8080/community");
};

export default fetchCommunityList;