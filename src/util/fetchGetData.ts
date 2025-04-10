// get으로 api 호출
const fetchGetData = async (url: string) => {
  try {
    const response = await fetch(`${url}`, {
      method: "GET", credentials: "include"
    });
    if (!response.ok) throw new Error("API 연결 오류");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("데이터 getData로 불러오기 오류", error);
  }
};

export default fetchGetData;