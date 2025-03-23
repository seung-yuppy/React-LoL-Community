// 커뮤니티 좋아요 누르기
const fetchAddLikeCommunityList = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8080/community/${id}/like`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) throw new Error("API 연결 오류");
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("좋아요 누르기 오류", error);
  }
}

export default fetchAddLikeCommunityList;