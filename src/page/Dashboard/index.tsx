import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, createTheme, ThemeProvider } from "@mui/material"
const tempData = [
    {
        name: "Hello",
        count: 12
    },
    {
        name: "World",
        count: 20
    },
]

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
                    <Grid container>
                        <Grid item xs={5}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" marginBottom={"2rem"}>
                                        Jumlah Kata yang dicari
                                    </Typography>
                                    <Typography variant="h5" >
                                        <List>
                                            {
                                                tempData.map(el => (
                                                    <ListItem>
                                                        <ListItemText>
                                                            <Grid container justifyContent={"space-between"}>
                                                                <Grid item>
                                                                    {el.name}
                                                                </Grid>
                                                                <Grid item>
                                                                    {el.count} X
                                                                </Grid>
                                                            </Grid>
                                                        </ListItemText>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>

        </>
    )
}

