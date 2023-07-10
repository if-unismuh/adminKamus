import useAuth from "../Hook/useAuth"
import { CircularProgress, Typography, Grid, Box } from "@mui/material"
import SideBar from "../component/SideBar"
import NavBar from "../component/NavBar"
import { Suspense, useEffect } from "react"

const Loading = () => <Grid sx={{ minHeight: "100vh" }} container justifyContent={"center"} alignItems={"center"} direction={"column"}>
    <Grid item>
        <CircularProgress />
    </Grid>
</Grid>

const _LayoutTemplate = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
            <SideBar />
            <Box sx={{ marginLeft: "45vh", marginTop: "15vh" }}>
                {children}
            </Box>
        </>
    )
}

export default function Guard({ children }: { children: React.ReactNode }) {

    const { isLoading, user } = useAuth()


    if (user != null && isLoading) {
        return (
            <_LayoutTemplate>
                <Loading />
            </_LayoutTemplate>)
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (user == null) {
        return (
            <Suspense>
                {children}
            </Suspense>
        )
    }



    return (
        <_LayoutTemplate>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </_LayoutTemplate>
    )
}   