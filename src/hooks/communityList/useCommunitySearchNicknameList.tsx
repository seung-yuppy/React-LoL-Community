import { useQuery } from "@tanstack/react-query";
import IContent from "../../types/content";
import fetchSearchNicknameCommunityList from "../../services/communityList/communitySearchNicknameListService";

const useCommunitySearchNicknameList = (nickname: string) => {
  return useQuery<IContent[]>({
    queryKey: ['searchNicknameCommunityList', nickname],
    queryFn: () => fetchSearchNicknameCommunityList(nickname),
    enabled: !!nickname,  // 검색어가 있을 때만 쿼리 실행
  });
};

export default useCommunitySearchNicknameList;