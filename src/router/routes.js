import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignIn from '../components/auth/SignIn';
import GetNews from '../components/news/getNews';
import NewNotice from '../components/news/NewNotice';
import LayoutDashboard from '../layout/LayoutDashboard';

const RouterApp = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />
    },
    {
      path: "/dashboard",
      element: <LayoutDashboard />
    },
    {
      path: "/news98606cac-9762-11ed",
      element: <NewNotice />
    },
    {
      path: "/noticias",
      element: <GetNews />
    },
    {
      path: "*",
      element: <SignIn />
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default RouterApp
