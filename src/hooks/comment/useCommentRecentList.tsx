import { useQuery } from "@tanstack/react-query"
import IComment from "../../types/comment"
import fetchCommentRecentList from "../../services/comment/commentRecentListService"

const useCommentRecentList = (communityId: string) => {
  return useQuery<IComment[]>({
    queryKey: ['commentRecent'],
    queryFn: () => fetchCommentRecentList(communityId),
    enabled: !!communityId,
  });
}

export default useCommentRecentList;