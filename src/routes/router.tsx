import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import App from "../App";
import ErrorComponent from "../components/errorComponent";
import ErrorPage from "../pages/errorPage";
import MyPage from "../pages/mypage";
import SelectNickName from "../pages/selectNickName";
import CommunityWrite from "../pages/CommunityWrite";

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
                path: "login",
                element: <Login />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "mypage",
                element: <MyPage />,
                errorElement: <ErrorComponent />
            },
            {
                path: "mypage/nickname",
                element: <SelectNickName />,
                errorElement: <ErrorComponent />
            },
            {
                path: "community/write",
                element: <CommunityWrite />,
                errorElement: <ErrorComponent />
            }
        ],
        errorElement: <ErrorPage />,
    },
]);

export default Router;
