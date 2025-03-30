import { useQuery } from "@tanstack/react-query"
import IContent from "../../types/content"
import fetchCommunity from "../../services/community/communityService"

const useCommunity = (communityId: string) => {
  return useQuery<IContent>({
    queryKey: ['community'],
    queryFn: () => fetchCommunity(communityId),
    enabled: !!communityId  // communityId가 있을 때만 쿼리 실행
  });
}

export default useCommunity;