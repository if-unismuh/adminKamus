import { CircularProgress, Grid, Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./page/layout";
import Login from "./page/Login";
import delayImport from "./util/delay";
const Dashboard = lazy(() => delayImport(1000, import("./page/Dashboard")))
const Words = lazy(() => delayImport(1000, import("./page/Words")))


const rout = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },

      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/words",
        element: <Words />
      }
    ]
  },

])
export default function App() {
  return (
    
      <RouterProvider router={rout} />
    
  )
}