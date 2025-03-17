import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const MainContainer = styled.div``;

const Title = styled.span`
  font-size: 2.3rem;
  margin-top: 3rem;
`;

const CommunityWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    navigate("/");
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
      <MainContainer>
        <Title>글 작성</Title>
        <form>
          <input
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            type="text"
          />
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "내용을 입력하세요.",
              extraPlugins: [uploadPlugin],
            }}
            data=""
            onChange={(_, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
          <button onClick={(event) => sendCommunity(event, title, content)}>
            글 게시하기
          </button>
        </form>
      </MainContainer>
    </Wrapper>
  );
}

export default CommunityWrite;
