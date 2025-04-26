import { useQuery } from "@tanstack/react-query";
import fetchSearchContentCommunityList from "../../services/communityList/communitySearchContentListService";
import IContent from "../../types/content";

const useCommunitySearchContentList = (content: string, page: number = 0) => {
  return useQuery<IContent[]>({
    queryKey: ['searchContentCommunityList', content, page],
    queryFn: () => fetchSearchContentCommunityList(content, page),
    enabled: !!content && page >= 0,  // 검색어가 있을 때만 쿼리 실행
  });
};

export default useCommunitySearchContentList;