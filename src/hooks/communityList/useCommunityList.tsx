import { useQuery } from "@tanstack/react-query";
import fetchCommunityList from "../../services/communityList/communityListService";
import IContent from "../../types/content";

const useCommunityList = () => {
  return useQuery<IContent[]>({
    queryKey: ['communityList'],
    queryFn: fetchCommunityList,
  });
};

export default useCommunityList;