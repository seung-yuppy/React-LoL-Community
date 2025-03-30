import { useQuery } from "@tanstack/react-query"
import IComment from "../../types/comment"
import fetchCommentList from "../../services/comment/commenListService"

const useCommentList = (communityId: string) => {
  return useQuery<IComment[]>({
    queryKey: ['comment'],
    queryFn: () => fetchCommentList(communityId),
    enabled: !!communityId,
  })
}

export default useCommentList;