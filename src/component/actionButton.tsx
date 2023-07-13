import { Divider, Grid, IconButton, ListItem, ListItemText, Menu } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { StyledMenu } from "./select";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ActionButton({hapus, edit} : {hapus : any, edit : any}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <IconButton onClick={(ev) => {
                setAnchorEl(ev.currentTarget);
            }}>
                <MoreVertIcon />
            </IconButton>
            <Menu id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                <StyledMenu onClick={() => {
                    edit()
                    handleClose()
                    
                    }} >
                    <Grid container spacing={2}>
                        <Grid item>
                            <EditIcon />
                        </Grid>
                        <Grid item>
                            Edit
                        </Grid>
                    </Grid>
                </StyledMenu>
                <StyledMenu onClick={() => {
                    hapus()
                    handleClose()
                    
                    }}>
                <Grid container spacing={2}>
                        <Grid item>
                            <DeleteIcon />
                        </Grid>
                        <Grid item>
                            Delete
                        </Grid>
                    </Grid>
                </StyledMenu>

            </Menu>
        </>
    )
}