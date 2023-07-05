import { Box, Paper, Grid, Avatar, Menu, MenuItem, Button, ListItem, ListItemText, Divider, Badge } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { useState } from "react"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import useAuth from "../Hook/useAuth";
export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const auth = useAuth()
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ height: "14vh", width: "100%", marginY: "2rem", marginLeft: "45vh", position: "fixed", top: 0, left: 0 }}>
            <Paper sx={{ width: "75%", height: "70%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={6} >
                        <Grid container direction={"row-reverse"} alignItems={"center"} sx={{ paddingRight: "2rem" }} spacing={2} >
                            <Grid item>

                                <Box onClick={(ev) => {
                                    setAnchorEl(ev.currentTarget);
                                }} >

                                    <Avatar sx={{
                                        bgcolor: deepOrange[500],
                                        '&:hover': {
                                            cursor: "pointer"
                                        }
                                    }}>N</Avatar>
                                </Box>


                            </Grid>
                            <Grid item>
                                <Badge badgeContent={4} color="primary" sx={{
                                    "&:hover" : {
                                        cursor: "pointer"
                                    }
                                }}>
                                    <NotificationsNoneIcon fontSize="medium" />
                                </Badge>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Menu id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                <ListItem>
                    <ListItemText sx={{ fontWeight: "bolder" }}>
                        {auth.user?.username}
                    </ListItemText>
                </ListItem>
                <Divider />
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    auth.logout()
                }}>Logout</MenuItem>
            </Menu>
        </Box>
    )
}