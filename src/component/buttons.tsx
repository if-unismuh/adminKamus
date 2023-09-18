import { Button, ButtonProps, buttonClasses } from "@mui/material"
import styled from '@emotion/styled';
import React from "react";
export const CustomActionButton = styled(Button)({
    [`&.${buttonClasses.contained}`]: {
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to right, #4942E4, #9C94F4)",
        color: "white",
        '&:hover': {
            backgroundColor: "#4942E4",
        }
    }
})



const colorObj : {
    "red" : string,
    "green" : string,
    "blue" : string
} = {
    "red": "#E76161",
    "green": "#A2FF86",
    "blue": "#4FC0D0"
} 

const darkColorObj : typeof colorObj = {
    "red": "#6e1111",
    "green": "#27A700",
    "blue": "#22727E"

}


export const SmallColoredButton = ({color, children, ...rest}:{color: keyof typeof colorObj, children : React.ReactNode  } & Omit<ButtonProps, 'color' | 'variant' | 'size'>) => {
    return (
        <Button {...rest} type="button" size="small" variant="contained" sx={{
            [`&.${buttonClasses.contained}`]: {
                fontFamily: "'Poppins', sans-serif",
                background: `${colorObj[color]}`,
                color: "white",
                '&:hover': {
                    backgroundColor: darkColorObj[color],
                }
            }
        }} >
            {children}
        </Button>
    )
} 