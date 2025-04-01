import fetchGetData from "../../util/fetchGetData"

const fetchCommentRecentList = (communityId: string) => {
  return fetchGetData(`http://localhost:8080/${communityId}/comment`);
};

export default fetchCommentRecentList;
