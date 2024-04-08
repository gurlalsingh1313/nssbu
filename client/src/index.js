import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Layouts from './components/Layouts';
import ErrorPage from './pages/ErrorPage';
import PostDetail from './pages/PostDetail';
import Home from './pages/Home';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePosts from './pages/CreatePosts';
import EditPost from './pages/EditPosts';
import DeletePosts from './pages/DeletePosts.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UserProvider from './context/userContext.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layouts/></UserProvider>,
    errorElement: <ErrorPage />,
    children:[
      {index:true,element:<Home />},
      {path:"posts/:id",element:<PostDetail />},
      {path:"register",element:<Register />},
      {path:"login",element:<LoginPage />},
      {path:"profile/:id",element:<UserProfile />},
      {path:"authors",element:<Authors />},
      {path:"create",element:<CreatePosts />},
      {path:"posts/:id/edit",element:<EditPost />},
      {path:"posts/:id/delete",element:<DeletePosts />},
      {path:"/myposts/sdfdf",element:<Dashboard />},

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

