import useAuth from "../Hook/useAuth"
import { CircularProgress, Typography, Grid, Box } from "@mui/material"
import SideBar from "../component/SideBar"
import NavBar from "../component/NavBar"
import {Suspense} from "react"

const Loading = () => <Grid sx={{ minHeight: "100vh" }} container justifyContent={"center"} alignItems={"center"} direction={"column"}>
<Grid item>
    <CircularProgress />
</Grid>
</Grid>

export default function Guard({ children }: { children: React.ReactNode }) {

    const { isLoading, user } = useAuth()
    if (isLoading) {
        return (
            <Loading/>
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
        <>
            <NavBar/>
            <SideBar />
            <Box sx={{marginLeft : "45vh", marginTop :"15vh"}}>
                <Suspense fallback={ <Loading/>}>
                    {children}
                </Suspense>
            </Box>
        </>
    )
}   