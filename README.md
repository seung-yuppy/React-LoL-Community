# React-LoL-Community

기존에 만든 React Soccer Community를 좀 더 확장해서 만든 React LoL Community입니다.

### 📍 기존과 확장된 차이점

| 제목                              | 기존(React Soccer Community) | 확장(React LoL Community) |
| --------------------------------- | ---------------------------- | ------------------------- |
| 상태관리 라이브러리               | Recoil                       | Zustand                   |
| 빌드도구                          | Webpack                      | Vite                      |
| react-query                       | X                            | O                         |
| React Version                     | 18                           | 19                        |
| React-Router Version              | 6                            | 7                         |
| @ckeditor/ckeditor5-build-classic | 43.0.0                       | 44.3.0                    |

### 📍 사용 라이브러리

| 라이브러리명                                                 | 설명                                                                                                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| styled-components                                            | 컴포넌트별로 스타일링을 위한 라이브러리                                                                                        |
| zustand                                                      | 상태 관리 라이브러리                                                                                                           |
| react-router-dom                                             | 페이지 간 이동을 위한 라이브러리                                                                                               |
| react-query                                                  | 서버 상태를 패칭, 캐싱, 동기화, 업데이트하는 작업을 쉽게 해주는 라이브러리                                                     |
| @stomp/stompjs, socket.io-client, sockjs-client              | 실시간 채팅을 위한 라이브러리                                                                                                  |
| @ckeditor/ckeditor5-build-classic, @ckeditor/ckeditor5-react | 첨부 파일과 함께 글을 작성하기 위한 글쓰기 툴 라이브러리(44버전 이상부터는 config에 licenseKey를 GPL로 해야 무료판을 사용가능) |

### 📍 주요 기능

#### 1. 홈 화면

기존의 홈화면에서는 페이지 전환이 빈번히 필요했지만 수정된 커뮤니티 사이트에서는 사이드 메뉴바와 채팅바를 기본 레이아웃으로 설정하였습니다.

#### 2. 모달창

다양한 알림과 경고창을 모달로 관리하였고, 기존의 커뮤니티 사이트에서는 로그인 페이지에서 로그인을 진행했지만 현 사이트에서는 모달창을 이용해서 로그인을 할 수 있도록 수정하였습니다.

#### 3. 실시간 채팅

로그인 후 닉네임과 팀 설정 시 다른 유저들과의 실시간 채팅이 되고 해당 채팅은 휘발성으로 창을 닫으면 자동으로 나갈 수 있습니다.

#### 4. 댓글과 대댓글

기존의 커뮤니티 글에서는 댓글만 작성할 수 있지만, 수정된 커뮤니티 사이트에서는 댓글에 대한 대댓글(댓글에 대한 답변)을 추가해 좀 더 원활히 다른 유저들과의 의견 교환을 할 수 있게 했습니다.

#### 5. 댓글 좋아요/싫어요

댓글의 좋아요와 싫어요를 확인함으로 글의 전반적인 여론을 확인하기 쉽게 만들었습니다.


### 📍 주요 기능 실행화면

#### 메인화면

![메인화면](https://github.com/user-attachments/assets/3fe960b3-7d4f-4032-8fb1-49f0ba1f8cc2)

#### 카테고리화면
![카테고리](https://github.com/user-attachments/assets/4bb00427-1912-4c59-9b9b-94c71232bb43)

#### 채팅창
![창채팅](https://github.com/user-attachments/assets/6047a3e5-a2f2-4d45-855c-2fb37510447d)

#### 페이징
![튼다음버](https://github.com/user-attachments/assets/06e67719-63b5-4703-b671-f951b99e5275)


### 📍 시연 영상
https://www.youtube.com/watch?v=1jigB8RXR2E
