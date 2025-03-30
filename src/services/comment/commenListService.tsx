import fetchGetData from "../../util/fetchGetData"

const fetchCommentList = (communityId: string) => {
  return fetchGetData(`http://localhost:8080/${communityId}/comment/popularity`);
}

export default fetchCommentList;