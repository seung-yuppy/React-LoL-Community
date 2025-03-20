import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import IContent from "../types/content";
import Modal from "../components/modal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 50rem;
  border: 1px solid #333;
  border-radius: 1rem;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

const TitleInput = styled.input`
  height: 2.5rem;
  width: 35rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  background-color: #fff;
  color: #333;
`;

const Title = styled.span`
  font-size: 2.3rem;
`;

const WriteButton = styled.button`
    color: #fff;
    background-color: #08ccac;
    border: #08ccac;
    padding: 0.7rem 2rem;
    font-size: 1.2rem;
    border-radius:0.5rem;
    cursor: pointer;
`;

const CommunityEdit = () => {
    const { communityId } = useParams();
    const [title, setTitle] = useState<string>(""); // 글 제목
    const [content, setContent] = useState<string>(""); // 글 내용
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false); // 글 수정 알림 모달 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `http://localhost:8080/community/${communityId}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const json = await response.json();
            setTitle(json.title);
            setContent(json.content);
        })();
    }, []);

    const editCommunity = async (
        e: React.MouseEvent<HTMLButtonElement>,
        title: string,
        content: string
    ) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/community/${communityId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
            credentials: "include",
        });
        setShowConfirmModal(true);
    };

    const customUploadAdapter = (loader: any) => {
        return {
            upload() {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    loader.file.then((file: File) => {
                        formData.append("upload", file);
                        fetch(`http://localhost:8080/image/upload`, {
                            method: "POST",
                            body: formData,
                            credentials: "include",
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.uploaded) {
                                    resolve({ default: data.url });
                                    console.log(resolve({ default: data.url }));
                                } else {
                                    reject("Image upload failed.");
                                }
                            })
                            .catch((error) => {
                                console.error("Fetch error:", error);
                                reject(error);
                            });
                    });
                });
            },
        };
    };

    function uploadPlugin(editor: any) {
        editor.plugins.get("FileRepository").createUploadAdapter = (
            loader: any
        ) => {
            return customUploadAdapter(loader);
        };
    }

    return (
        <>
            <Wrapper>
                <MainContainer>
                    <Title>글 수정</Title>
                    <TitleInput
                        placeholder="제목을 입력하세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                    />
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            licenseKey: "GPL",
                            extraPlugins: [uploadPlugin],
                        }}
                        data={content}
                        onChange={(_, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />
                    <WriteButton onClick={(e) => editCommunity(e, title, content)}>
                        글 수정하기
                    </WriteButton>
                </MainContainer>
            </Wrapper>

            {/* 모달 관리 */}
            {showConfirmModal &&
                <Modal onClick={() => { setShowConfirmModal(false); navigate(`/community/${communityId}`) }}>
                    <Title> 글 등록을 완료하였습니다.</Title >
                </Modal >
            }
        </>
    );
}

export default CommunityEdit;