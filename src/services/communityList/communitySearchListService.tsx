import fetchGet from "../../util/fetchGet"

const fetchSearchCommunityList = (title: string, page: number = 0) => {
  return fetchGet(`https://render-host-rw27.onrender.com/community/search1/${title}?page=${page}`)
}

export default fetchSearchCommunityList;