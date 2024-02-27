import TestPage from "../pages/TestPage";
import Error from "../pages/Error";
import PostPage from "../pages/PostPage";
import Posts from "../pages/Posts";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: "/test", element: TestPage},
    {path: "/posts", element: Posts},
    {path: "/posts/:id", element: PostPage},
]

export const publicRoutes = [
    {path: "/login", element: Login},
]