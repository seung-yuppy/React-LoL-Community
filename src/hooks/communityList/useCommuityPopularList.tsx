import { useQuery } from "@tanstack/react-query"
import IContent from "../../types/content"
import fetchPopoularCommunityList from "../../services/communityList/communityPopularListService"

const useCommunityPopularList = () => {
  return useQuery<IContent[]>({
    queryKey: ['popularCommunityList'],
    queryFn: fetchPopoularCommunityList,
  });
};

export default useCommunityPopularList;