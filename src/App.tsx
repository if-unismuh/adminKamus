import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./page/layout";
import Login from "./page/Login";
import delayImport from "./util/delay";
const Dashboard = lazy(() => delayImport( 1000,import("./page/Dashboard")))


const rout = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
      {
        index : true,
        element : <Dashboard/>
      },
      
      {
        path : "/login",
        element : <Login/>
      }
    ]
  },
  
])
export default function App() {
  return (
      <RouterProvider router={rout} />
  )
}