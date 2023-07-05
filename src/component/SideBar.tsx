import { Paper, Grid, Box, Typography, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AbcIcon from '@mui/icons-material/Abc';
const ListSideItem = [
    {
        title: "Dashboard",
        rout: "/",
        Icon : DashboardIcon
    },
    {
        title: "List Kata",
        rout: "/words",
        Icon : AbcIcon
    },
]

export default function SideBar() {
    const nav = useNavigate()
    const loc = useLocation()
    return (
        <Paper sx={{ position: "fixed", top: 0, left: 0, height: "100vh", width: "40vh", overflowY: "center" }}>
            <Grid container direction={"column"} spacing={3}>
                <Grid item>
                    <Typography variant="h5" fontFamily={"'Poppins', sans-serif"} fontWeight={"bolder"} textAlign={"center"} marginY="2rem">
                        Admin Kamus Bahasa Bugis
                    </Typography>
                </Grid>

                {
                    ListSideItem.map((el) => {
                        const selected = el.rout == loc.pathname
                        return (
                            <Grid item marginX={"1rem"}>
                                <ListItemButton sx={{
                                    borderRadius: ".5rem",
                                    backgroundColor: selected ? "#4942E4" : "transparent",
                                    color: selected ? "white" : "black",
                                    '&:hover': {
                                        backgroundColor: selected ? "#4942E4" : "#f4f5f5",
                                    }
                                }} onClick={() => {
                                    nav(el.rout)
                                }}>
                                    <ListItemIcon  >
                                        {
                                            <el.Icon htmlColor={selected ? "white" : "black"}  />
                                        }
                                       
                                    </ListItemIcon>
                                    <ListItemText primary={el.title} />
                                </ListItemButton>
                            </Grid>
                        )
                    })
                }

            </Grid>
        </Paper>
    )
}