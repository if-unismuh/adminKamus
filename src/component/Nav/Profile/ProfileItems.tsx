import styled from '@emotion/styled';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const dropItems : Array<{Icon : any, label:string, path:string}> = [
    {
        label : "Profile",
        Icon :  PermIdentityOutlinedIcon,
        path : "/profile"
    }
]
const NavButton = styled(Button)(({theme}) => ({
    '&:hover': {
      backgroundColor: 'rgba(49,132,215,0.2)',
      color : 'rgb(49,132,215)' // Replace with your desired background color
    },
  
}));

export default function ProfileItem({Icon, label, path}:{Icon:any, label:string,path:string}) {
    const nav = useNavigate()
    return(
        <NavButton onClick={() => {
            nav(path)
        }} sx={{color:"black", display: "flex", justifyContent:"flex-start", alignItems:"center" }} fullWidth variant="text">
        <p className=" "><Icon/></p>
        <p className="font-medium ml-4 capitalize">{label}</p>
    </NavButton>
    )
}