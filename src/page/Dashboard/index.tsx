import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, createTheme, ThemeProvider } from "@mui/material"
import SearchingWords from "./JumlahCount"
import WordCount from "./jumlahWords"

const theme = createTheme(
    {
        typography : {
            fontFamily : "'Dosis', sans-serif"
        }
    }
)

export default function Dashboard() {
    document.title = "Dashboard"
    return (
        <>
        <ThemeProvider theme={theme}>

            <Grid container direction={"column"}>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <SearchingWords/>
                        </Grid>
                        <Grid item xs={2}>
                            <WordCount/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>

        </>
    )
}

