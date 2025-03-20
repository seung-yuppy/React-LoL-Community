import { Link } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../stores/useAuth";
import ico_up from "../assets/images/ico_up.svg"
import ico_down from "../assets/images/ico_down.svg";
import IContent from "../types/content";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 50rem;
    width: 60rem;
`;

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 42rem;
    border: 1px solid #333;
    padding: 1rem 2rem;
    border-radius: 1rem;
`;

const TableBox = styled.ul`
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: scroll;
`;

const TableBody = styled.li`
    display: flex;
    justify-content: flex-start;
    font-size: 1.2rem;
    padding: 1rem;
    width: 45rem;
    gap: 5rem;
    transition: color 0.3s;
    border-bottom: 1px solid gray;
`;

const TableBodytd = styled.div`
    display: flex;
    flex-direction: column;
`;

const TableTitle = styled.h2`
    font-size:1.5rem;
    font-weight: bold;
`;

const TableDate = styled.h2`
    font-weight: lighter;
    font-size: 1rem;
`;

const BoxInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LikeButton = styled.button`
    cursor: pointer;
    color: #333;
    font-size: 1.3rem;
`;

const SearchImage = styled.img`
    width: 1.2rem;
    object-fit: cover;
`;

type CommunitiesProps = {
    communityList: IContent[];
    addLike: (id: number) => void;
}

const Communities = ({ communityList, addLike }: CommunitiesProps) => {
    const { isLogin } = useAuth();  // 로그인 상태 관리

    return (
        <>
            <Wrapper>
                <MainContainer>
                    {!isLogin ? (
                        <TableTitle>로그인 후 이용해주세요.</TableTitle>
                    ) : communityList.length === 0 ? (
                        <TableTitle>게시글이 없습니다.</TableTitle>
                    ) : (
                        <TableBox>
                            {communityList.slice(0, 20).map((community) => (
                                <TableBody key={community.id}>
                                    <ButtonContainer>
                                        <LikeButton onClick={() => addLike(community.id)}>
                                            <SearchImage src={ico_up} alt="이미지 없음" />
                                        </LikeButton>
                                        {community.likesCount}
                                        <LikeButton>
                                            <SearchImage src={ico_down} alt="이미지 없음" />
                                        </LikeButton>
                                    </ButtonContainer>
                                    <Link to={`/community/${community.id}`}>
                                        <BoxInfo>
                                            <TableBodytd>
                                                <TableTitle>{community.title} [{community.commentsCount}]</TableTitle>
                                            </TableBodytd>
                                            <TableBodytd>
                                                <TableDate>조회수:{community.viewsCount} | {community.nickname}</TableDate>
                                            </TableBodytd>
                                        </BoxInfo>
                                    </Link>
                                </TableBody>
                            ))}
                        </TableBox>
                    )}
                </MainContainer>
            </Wrapper >
        </>
    );
}

export default Communities;
