import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../shared/Login";
import Register from "../shared/Register";
import ErrorPage from "../pages/ErrorPage";




 const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path:'register',
        Component: Register,
      }
      
    ]
    
  },
  {
    path: '*',
    Component: ErrorPage,
  }

])


export default router;