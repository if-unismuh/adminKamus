import { Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
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

export default function SearchingWords() {
    return (
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
    )
}