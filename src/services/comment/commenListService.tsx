import fetchGetData from "../../util/fetchGetData"

const fetchCommentList = (communityId: string) => {
  return fetchGetData(`https://render-host-rw27.onrender.com/${communityId}/comment/popularity`);
}

export default fetchCommentList;