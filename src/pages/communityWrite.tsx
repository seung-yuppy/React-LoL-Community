import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal";
import SideMenu from "../components/sideMenu";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
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

const CategorySelect = styled.select`
  width: 35rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  background-color: #fff;
  color: #333;
`;

const CommunityWrite = () => {
  const [title, setTitle] = useState<string>(""); // 글 제목
  const [content, setContent] = useState<string>(""); // 글 내용
  const [category, setCategory] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false); // 글 등록 알림 모달 상태 관리
  const navigate = useNavigate();

  const sendCommunity = async (
    e: React.MouseEvent<HTMLButtonElement>,
    title: string,
    content: string,
    category: string
  ) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/community`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, category }),
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
      <SideMenu />
      <Wrapper>
        <MainContainer>
          <Title>글 작성</Title>
          <TitleInput
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            type="text"
          />
          <CategorySelect value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" selected disabled hidden>카테고리를 선택해주세요</option>
            <option value={"팁과 노하우"}>팁과 노하우</option>
            <option value={"패치노트"}>패치노트</option>
            <option value={"자유"}>자유</option>
            <option value={"유머"}>유머</option>
            <option value={"질문"}>질문</option>
            <option value={"자랑글"}>자랑글</option>
          </CategorySelect>
          <CKEditor
            editor={ClassicEditor}
            config={{
              licenseKey: "GPL",
              placeholder: "내용을 입력하세요.",
              extraPlugins: [uploadPlugin],
            }}
            data=""
            onChange={(_, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
          <WriteButton onClick={(e) => sendCommunity(e, title, content, category)}>
            글 게시하기
          </WriteButton>
        </MainContainer>
      </Wrapper >

      {/* 모달 관리 */}
      {showConfirmModal &&
        <Modal onClose={() => { setShowConfirmModal(false); navigate("/") }}>
          <Title> 글 등록을 완료하였습니다.</Title >
        </Modal >
      }
    </>
  );
}

export default CommunityWrite;