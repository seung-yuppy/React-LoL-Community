import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const CommunityWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false); // 글 등록 알림 모달 상태 관리
  const navigate = useNavigate();

  const sendCommunity = async (
    event: React.FormEvent<HTMLButtonElement>,
    title: string,
    content: string
  ) => {
    event.preventDefault();
    await fetch(`http://localhost:8080/community`, {
      method: "POST",
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
                  console.log(data);
                  console.log("data url은 " + data.url);
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
    <Wrapper>
      {showConfirmModal &&
        <Modal onClick={() => { setShowConfirmModal(false); navigate("/") }}>
          <Title> 글 등록을 완료하였습니다.</Title >
        </Modal >
      }
      <MainContainer>
        <Title>글 작성</Title>
        <TitleInput
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          type="text"
        />
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
        <WriteButton onClick={(event) => sendCommunity(event, title, content)}>
          글 게시하기
        </WriteButton>
      </MainContainer>
    </Wrapper >
  );
}

export default CommunityWrite;