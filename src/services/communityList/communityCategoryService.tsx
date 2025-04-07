import fetchGetData from "../../util/fetchGetData";

// 커뮤니티 카테고리 불러오기
const fetchCategoryCommunityList = async (category: string) => {
  return fetchGetData(`http://localhost:8080/category/${category}`);
}

export default fetchCategoryCommunityList;