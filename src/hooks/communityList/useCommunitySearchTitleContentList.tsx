import { useQuery } from "@tanstack/react-query"
import IContent from "../../types/content"
import fetchSearchTitleContentCommunityList from "../../services/communityList/communitySearchTitleContentService";

const useCommunitySearchTitleContentList = (searchParam: string, page: number = 0) => {
  return useQuery<IContent[]>({
    queryKey: ['searchTitleContentCommunityList', searchParam, page],
    queryFn: () => fetchSearchTitleContentCommunityList(searchParam, page),
    enabled: !!searchParam && page >= 0,
  });
};

export default useCommunitySearchTitleContentList;