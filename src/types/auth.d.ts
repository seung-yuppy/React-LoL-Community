type AuthState = {
    isLogin: boolean;
    userInfo: IUserInfo | null; // 추가 사용자 정보(사용자가 로그인 후 설정해야되서 null이 기본값)
    login: () => void;
    logout: () => void;
    setInfo: (infoData: IUserInfo) => void; // 추가 사용자 정보 저장 함수
};

export default AuthState;
