import { useQuery } from "@tanstack/react-query";
import fetchCommunityList from "../../services/communityList/communityListService";
import IContent from "../../types/content";

const useCommunityList = (page: number = 0) => {
  return useQuery<IContent[]>({
    queryKey: ['communityList', page],
    queryFn: () => fetchCommunityList(page),
  });
};

export default useCommunityList;