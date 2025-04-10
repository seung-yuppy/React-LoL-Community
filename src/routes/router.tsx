import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import App from "../App";
import ErrorComponent from "../components/errorComponent";
import ErrorPage from "../pages/errorPage";
import MyPage from "../pages/mypage";
import SelectNickName from "../pages/selectUserInfo";
import CommunityWrite from "../pages/communityWrite";
import Community from "../pages/community";
import CommunityEdit from "../pages/communityEdit";
import EditNickname from "../pages/editNickname";
import EditTeamimage from "../pages/editTeamimage";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "mypage",
                element: <MyPage />,
                errorElement: <ErrorComponent />
            },
            {
                path: "mypage/editnickname",
                element: <EditNickname />,
                errorElement: <ErrorComponent />
            },
            {
                path: "mypage/editteamimage",
                element: <EditTeamimage />,
                errorElement: <ErrorComponent />
            },
            {
                path: "mypage/userinfo",
                element: <SelectNickName />,
                errorElement: <ErrorComponent />
            },
            {
                path: "community/write",
                element: <CommunityWrite />,
                errorElement: <ErrorComponent />
            },
            {
                path: "community/:communityId",
                element: <Community />,
                errorElement: <ErrorComponent />
            },
            {
                path: "community/:communityId/edit",
                element: <CommunityEdit />,
                errorElement: <ErrorComponent />
            },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default Router;
