import fetchGetData from "../../util/fetchGetData"

const fetchCommentRecentList = (communityId: string) => {
  return fetchGetData(`https://render-host-rw27.onrender.com/${communityId}/comment`);
};

export default fetchCommentRecentList;
