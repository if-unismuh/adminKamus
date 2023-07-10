import { gql, useQuery } from "@apollo/client";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { LuWholeWord } from "react-icons/lu"
export default function WordCount() {
    const { data, error, loading } = useQuery(gql`
    {
        words {
            _id,
            
          }
      }

`)
    return (
        <>
            <Card >
                <CardContent >
                    <Grid container marginX={"2rem"} marginY={"1rem"}>
                        <LuWholeWord size={"3rem"} style={{ color: "#00CFE7", backgroundColor: "#D6F7FB" }} />
                    </Grid>
                    <Typography variant="h6" textAlign={"center"} fontWeight={"bolder"} fontFamily={"'Poppins', sans-serif"}>
                        Jumlah Kata
                    </Typography>
                    <Typography variant="h5" textAlign={"center"}>
                        {
                            (!error && !loading) && data.words.length
                        }
                    </Typography>
                </CardContent>

            </Card>
        </>
    )
}