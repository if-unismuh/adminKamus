import { alpha, styled, inputBaseClasses, TextField, textFieldClasses } from "@mui/material"

export const BootstrapInput = styled(TextField)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },

    
    position: 'relative',

    
    fontSize: 16,

   
    transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
    }
}));