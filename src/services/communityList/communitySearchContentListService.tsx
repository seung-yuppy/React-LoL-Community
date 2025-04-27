import fetchGet from "../../util/fetchGet"

const fetchSearchContentCommunityList = (content: string, page: number = 0) => {
  return fetchGet(`https://render-host-rw27.onrender.com/community/search2/${content}?page=${page}`)
};

export default fetchSearchContentCommunityList;