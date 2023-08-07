import { Box, Paper, Grid, Avatar, Menu, MenuItem, Button, ListItem, ListItemText, Divider, Badge, Typography } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { useState } from "react"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import useAuth from "../Hook/useAuth";
import { StyledMenu } from "./select";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const auth = useAuth()
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ height: "14vh", width: "100%", marginY: "2rem", marginLeft: "45vh", position: "fixed", top: 0, left: 0, zIndex: "1000" }}>
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
                                    "&:hover": {
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
                <StyledMenu onClick={handleClose}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <PersonIcon />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                Profile
                            </Typography>
                        </Grid>
                    </Grid>
                </StyledMenu>
                <StyledMenu onClick={() => {
                    setAnchorEl(null);
                    auth.logout()
                }}>
                    <Grid container spacing={2} >
                        <Grid item>
                            <LogoutIcon />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                            Logout
                            </Typography>
                        </Grid>
                    </Grid>
                </StyledMenu>
            </Menu>
        </Box>
    )
}