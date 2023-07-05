import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Auth from "../../provider/auth";
import Guard from "../../provider/guard";

export default function Layout() {
  return (
    <>
      <Auth>
        <Guard>
          <Outlet />
        </Guard>
      </Auth>
    </>
  );
}
