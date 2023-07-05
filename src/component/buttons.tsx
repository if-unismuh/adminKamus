import { Button, buttonClasses } from "@mui/material"
import styled from '@emotion/styled';
export const CustomActionButton = styled(Button)({
    [`&.${buttonClasses.contained}`]: {
        fontFamily : "'Poppins', sans-serif",
        background:  "linear-gradient(to right, #4942E4, #9C94F4)",
        color: "white" ,
        '&:hover': {
            backgroundColor:  "#4942E4" ,
        }
    }
})