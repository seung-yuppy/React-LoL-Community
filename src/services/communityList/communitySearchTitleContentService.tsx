import fetchGet from "../../util/fetchGet"

const fetchSearchTitleContentCommunityList = (searchParam: string, page: number = 0) => {
  return fetchGet(`https://render-host-rw27.onrender.com/community/search?title=${searchParam}&content=${searchParam}&page=${page}`)
};

export default fetchSearchTitleContentCommunityList;