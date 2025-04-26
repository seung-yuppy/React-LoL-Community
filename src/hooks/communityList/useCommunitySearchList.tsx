import { useQuery } from "@tanstack/react-query"
import IContent from "../../types/content"
import fetchSearchCommunityList from "../../services/communityList/communitySearchListService";

const useCommunitySearchList = (title: string, page: number = 0) => {
  return useQuery<IContent[]>({
    queryKey: ['searchCommunityList', title, page],
    queryFn: () => fetchSearchCommunityList(title, page),
    enabled: !!title && page >= 0, // 검색어가 있을 때만 쿼리 실행
  });
};

export default useCommunitySearchList;