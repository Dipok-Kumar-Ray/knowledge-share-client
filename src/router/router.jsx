import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../shared/Login";
import Register from "../shared/Register";
import ErrorPage from "../pages/ErrorPage";
import AllArticle from "../components/AllArticle";
import ArticleDetailsPage from "../components/ArticleDetailsPage";
import UpdateArticle from "../components/UpdateArticle";
import PrivateRoute from "../Private/PrivateRoute";
import PostArticles from "../components/PostArticles";
import MyArticles from "../pages/MyArticles";
import AboutUs from "../pages/AboutUs";




 const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader:() =>  fetch('http://localhost:4000/articles')
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
        element: <PrivateRoute><PostArticles></PostArticles></PrivateRoute>

      },
      {
        path: 'allArticle',
        Component: AllArticle,
        loader:() => fetch('http://localhost:4000/articles'),
      },
      {
        path:'articleDetails/:id',
        Component: ArticleDetailsPage,
        loader: () => fetch('http://localhost:4000/articles')
      },
      {
        path: 'myArticles',
        loader: () => fetch('http://localhost:4000/articles'),
        element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>
      },
      {
        path: 'updateArticle/:id',
        Component: UpdateArticle,
        loader: ({params}) => fetch(`http://localhost:4000/articles/${params.id}`)
      },
      {
        path: 'aboutUs',
        Component: AboutUs,
      }
      
    ]
    
  },
  {
    path: '*',
    Component: ErrorPage,
  }

])


export default router;