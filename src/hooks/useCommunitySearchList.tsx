import { useQuery } from "@tanstack/react-query"
import IContent from "../types/content"
import fetchSearchCommunityList from "../services/communityList/communitySearchListService";

const useCommunitySearchList = (search: string) => {
  return useQuery<IContent[]>({
    queryKey: ['searchCommunityList', search],
    queryFn: () => fetchSearchCommunityList(search),
    enabled: !!search,  // 검색어가 있을 때만 쿼리 실행
  });
};

export default useCommunitySearchList;