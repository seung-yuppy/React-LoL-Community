import fetchGet from "../../util/fetchGet"

const fetchSearchCommunityList = (title: string) => {
  return fetchGet(`http://localhost:8080/community/search1/${title}`)
}

export default fetchSearchCommunityList;