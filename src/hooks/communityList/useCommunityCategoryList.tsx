import { useQuery } from "@tanstack/react-query"
import IContent from "../../types/content"
import fetchCategoryCommunityList from "../../services/communityList/communityCategoryService"

const useCategoryCommunityList = (category: string) => {
  return useQuery<IContent[]>({
    queryKey: ['categoryCommunityList', category],
    queryFn: () => fetchCategoryCommunityList(category),
    enabled: !!category,
  });
};

export default useCategoryCommunityList;