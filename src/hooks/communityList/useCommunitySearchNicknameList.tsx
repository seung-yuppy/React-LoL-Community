import { useQuery } from "@tanstack/react-query";
import IContent from "../../types/content";
import fetchSearchNicknameCommunityList from "../../services/communityList/communitySearchNicknameListService";

const useCommunitySearchNicknameList = (nickname: string, page: number = 0) => {
  return useQuery<IContent[]>({
    queryKey: ['searchNicknameCommunityList', nickname, page],
    queryFn: () => fetchSearchNicknameCommunityList(nickname, page),
    enabled: !!nickname && page >= 0,  // 검색어가 있을 때만 쿼리 실행
  });
};

export default useCommunitySearchNicknameList;