const formatDate = (dateString: string) => {
  if (dateString) {
    // ISO 8601 형식의 날짜를 Date 객체로 변환
    const date = new Date(dateString);

    // 년, 월, 일, 시, 분, 초 추출
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 원하는 형식으로 문자열 생성
    const result = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
    return result;
  }
  return "-";
};

export default formatDate;
