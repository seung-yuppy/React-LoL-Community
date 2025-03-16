import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import App from "../App";
import ErrorComponent from "../components/errorComponent";
import ErrorPage from "../pages/errorPage";

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
        ],
        errorElement: <ErrorPage />,
    },
]);

export default Router;
