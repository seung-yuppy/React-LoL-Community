import { useQuery } from "@tanstack/react-query"
import IContent from "../../types/content"
import fetchSearchTitleContentCommunityList from "../../services/communityList/communitySearchTitleContentService";

const useCommunitySearchTitleContentList = (searchParam: string) => {
  return useQuery<IContent[]>({
    queryKey: ['searchTitleContentCommunityList', searchParam],
    queryFn: () => fetchSearchTitleContentCommunityList(searchParam),
    enabled: !!searchParam,
  });
};

export default useCommunitySearchTitleContentList;