import { useQuery } from "@tanstack/react-query";
import fetchSearchContentCommunityList from "../../services/communityList/communitySearchContentListService";
import IContent from "../../types/content";

const useCommunitySearchContentList = (content: string) => {
  return useQuery<IContent[]>({
    queryKey: ['searchContentCommunityList', content],
    queryFn: () => fetchSearchContentCommunityList(content),
    enabled: !!content,  // 검색어가 있을 때만 쿼리 실행
  });
};

export default useCommunitySearchContentList;