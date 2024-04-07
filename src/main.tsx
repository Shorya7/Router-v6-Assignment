import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import EditCourse from './components/editCourse.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/courses",
    element: <App/>,
  },
  {
    path:"/edit/:courseId",
    element: <EditCourse />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
