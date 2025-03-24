import fetchGet from "../../util/fetchGet"

const fetchSearchCommunityList = (search: string) => {
  return fetchGet(`http://localhost:8080/community/search/${search}`)
}

export default fetchSearchCommunityList;