import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../component/Nav";
import Sidebar from "../../component/Sidebar";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <div className="ml-[21vw]">
        <Nav />
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[100vh]">
              <div className="flex items-center flex-col">
                <CircularProgress />
                <br />
                <p className="font-semibold">Loading</p>
              </div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
