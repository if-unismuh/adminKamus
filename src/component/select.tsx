import styled from "@emotion/styled";
import { MenuItem, Select, menuItemClasses, selectClasses } from "@mui/material";

export const StyledSelect = styled(Select)({
        
        [`$.${selectClasses.select}`] : {
            color : "green"
        }
    
})

export const StyledMenu = styled(MenuItem)({
    marginLeft : ".6rem",
    marginRight : ".6rem",
    marginTop : ".5rem",
    marginBottom : ".5rem",
    "&:hover" : {
        backgroundColor : "#f4f3fe",
        color : "#4942E4",
        borderRadius : "8px",
    },
    [`&.${menuItemClasses.selected}`] : {
        backgroundColor : "#4942E4",
        color : "whitesmoke",
        borderRadius : "8px",
        "&:hover" : {
            backgroundColor : "#4942E4",
        }
    }
})