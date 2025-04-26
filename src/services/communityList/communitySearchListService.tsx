import fetchGet from "../../util/fetchGet"

const fetchSearchCommunityList = (title: string, page: number = 0) => {
  return fetchGet(`http://localhost:8080/community/search1/${title}?page=${page}`)
}

export default fetchSearchCommunityList;