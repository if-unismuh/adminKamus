import { useLocation } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const NavButton = styled(Button)(({theme}) => ({
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.2)', // Replace with your desired background color
    },
  
}));


export default function NavItem({ label, Icon, path }: { path: string; label: string; Icon: any }) {
const loc = useLocation();
return (
  <NavButton
    sx={{ backgroundColor : path == loc.pathname ? "rgba(0,0,0,0.06)" : "", color: "black", display: "flex", justifyContent: "space-around" }}
    variant="text"
  >
    <p>
      <Icon />{" "}
    </p>
    <p className="text-black capitalize tracking-wide">{label}</p>
    <p>
      <ChevronRightIcon htmlColor="black" />
    </p>
  </NavButton>
);
}
