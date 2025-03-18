import styled from "styled-components";
import Communities from "../components/communities";
import useAuth from "../stores/useAuth";
import { useEffect, useState } from "react";
import IContent from "../types/content";
import Modal from "../components/modal";
import CommunitiesHeader from "../components/communitiesHeader";

const CommunityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 50rem;
    width: 60rem;
`;

const TableTitle = styled.h2`
    font-size:1.5rem;
    font-weight: bold;
`;

const Home = () => {
    const { isLogin, setInfo } = useAuth();  // userInfo에 값을 넣기 위해서 useEffect와 만들었다
    const [communityList, setCommunityList] = useState<IContent[]>([]); // 커뮤니티 리스트 상태 관리
    const [showAlertModal, setShowAlertModal] = useState<boolean>(false); // 로그인 경고창 모달 상태 관리
    const [showLikeModal, setShowLikeModal] = useState<boolean>(false); // 좋아요 경고창 모달 상태 관리
    const [showDupLikeModal, setShowDupLikeModal] = useState<boolean>(false); // 이미 좋아요 누른 경고창 모달 상태 관리

    useEffect(() => {
        // 유저 상세 정보 불러오기(닉네임 생성 & myTeam 생성 이후)
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8080/info`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setInfo(data.nickname);
            } catch (error) {
                console.error("유저 상세 정보 불러오기 실패", error);
            }
        };
        // 커뮤니티 리스트 불러오기
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/community`, { method: "GET", credentials: "include" });
                if (!response.ok) {
                    throw new Error("API 연결 오류");
                }
                const data = await response.json();
                setCommunityList(data.content);
            } catch (error) {
                console.error("커뮤니티 리스트 불러오기 오류", error);
            }
        };
        fetchUserInfo();
        fetchData();
    }, [setInfo, showLikeModal]);

    // 좋아요 버튼 누르기
    const addLike = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/community/${id}/like`, {
                method: "POST",
                credentials: "include",
            })
            const data = await res.text();
            if (data === "이미 좋아요를 누르셨습니다.") {
                setShowDupLikeModal(true);
            } else if (data === "이 글을 좋아합니다.") {
                setShowLikeModal(true);
            } else {
                setShowAlertModal(true);
            }
        } catch (error) {
            console.error("좋아요 실패", error);
        }
    };

    // 최신순으로 정렬
    const handleRecent = async () => {
        if (!isLogin) {
            setShowAlertModal(true);
        } else {
            try {
                const response = await fetch(`http://localhost:8080/community`, { method: "GET", credentials: "include" });
                if (!response.ok) {
                    throw new Error("API 연결 오류");
                }
                const data = await response.json();
                setCommunityList(data.content);
            } catch (error) {
                console.error("커뮤니티 리스트 불러오기 오류", error);
            }
        }
    };

    // 10개 이상 좋아요 정렬
    const handlePopularity = async () => {
        if (!isLogin) {
            setShowAlertModal(true);
        } else {
            try {
                const response = await fetch(`http://localhost:8080/community/popularity`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setCommunityList(data.content);
            } catch (error) {
                console.error("10추 정렬 오류", error);
            }
        }
    };

    // 검색 폼 처리
    const handleSearchForm = async (search: string) => {
        if (!isLogin) {
            setShowAlertModal(true);
        } else {
            try {
                const response = await fetch(`http://localhost:8080/community/search/${search}`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setCommunityList(data.content);
            } catch (error) {
                console.error("검색 오류", error);
            }
        }
    };

    return (
        <>
            <CommunityWrapper>
                <CommunitiesHeader handleRecent={handleRecent} handlePopularity={handlePopularity} handleSearchForm={handleSearchForm} />
                <Communities communityList={communityList} addLike={addLike} />
            </CommunityWrapper>

            {/* 모달 관리 */}
            {showAlertModal &&
                <Modal onClick={() => setShowAlertModal(false)}>
                    <TableTitle>로그인 후 이용해주세요</TableTitle>
                </Modal>
            }
            {showLikeModal &&
                <Modal onClick={() => setShowLikeModal(false)}>
                    <TableTitle>이 글을 좋아합니다.❤️</TableTitle>
                </Modal>
            }
            {showDupLikeModal &&
                <Modal onClick={() => setShowDupLikeModal(false)}>
                    <TableTitle>이 글을 이미 좋아했습니다.</TableTitle>
                </Modal>
            }
        </>
    );
}

export default Home;