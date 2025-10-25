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
import CategoryArticles from "../pages/CategoryArticles";
import UserDashboard from "../components/UserDashboard";
import Leaderboard from "../components/Leaderboard";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader:() =>  fetch(`${import.meta.env.VITE_API_URL}`),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path:'register',
        element: <Register />,
      }, 
      {
        path:'postArticles',
        element: <PrivateRoute><PostArticles></PostArticles></PrivateRoute>
      },
      {
        path: 'allArticle',
        element: <AllArticle />,
      },
      {
        path:'articleDetails/:id',
        element: <ArticleDetailsPage />
      },
      {
        path: 'myArticles',
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/myArticles`),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>,
        element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>
      },
      {
        path: 'updateArticle/:id',
        element: <UpdateArticle />,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/articles/${params.id}`),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>
      },
      {
        path: 'dashboard',
        element: <PrivateRoute><UserDashboard /></PrivateRoute>
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />
      },
      {
        path: 'aboutUs',
        element: <AboutUs />,
      },
      {
        path: 'contact',
        element: <ContactSection />,
      },
      {
        path: 'category',
        element: <CategoryArticles />,
      },
      {
        path: 'category/:categoryName',
        element: <CategoryArticles />,
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />,
  }
]);

export default router;