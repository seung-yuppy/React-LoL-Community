import fetchGetData from "../../util/fetchGetData";

// 커뮤니티 카테고리 불러오기
const fetchCategoryCommunityList = async (category: string) => {
  return fetchGetData(`https://render-host-rw27.onrender.com/category/${category}`);
}

export default fetchCategoryCommunityList;