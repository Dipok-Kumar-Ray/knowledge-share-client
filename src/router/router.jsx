import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../shared/Login";
import Register from "../shared/Register";
import ErrorPage from "../pages/ErrorPage";
import PostArticles from "../components/PostArticles";
import AllArticle from "../components/AllArticle";




 const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader:() =>  fetch('http://localhost:3000/articles')
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path:'register',
        Component: Register,
      }, 
      {
        path:'postArticles',
        Component: PostArticles,

      },
      {
        path: 'allArticle',
        Component: AllArticle,
        loader:() => fetch('http://localhost:3000/articles'),
      }
      
    ]
    
  },
  {
    path: '*',
    Component: ErrorPage,
  }

])


export default router;