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
import ContactSection from "../shared/ContactSection";




 const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader:() =>  fetch('https://eduhive-server-side.vercel.app'),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>
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

      },
      {
        path:'articleDetails/:id',
        Component: ArticleDetailsPage
      },
      {
        path: 'myArticles',
        loader: () => fetch('https://eduhive-server-side.vercel.app/myArticles'),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>,
        element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>
      },
      {
        path: 'updateArticle/:id',
        Component: UpdateArticle,
        loader: ({params}) => fetch(`https://eduhive-server-side.vercel.app/articles/${params.id}`),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>
      },
      {
        path: 'aboutUs',
        Component: AboutUs,
      },
      {
        path: 'contact',
        Component: ContactSection,
      }
      
    ]
    
  },
  {
    path: '*',
    Component: ErrorPage,
  }

])


export default router;