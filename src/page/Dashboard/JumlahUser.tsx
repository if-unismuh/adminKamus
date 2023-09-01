import { gql, useQuery } from "@apollo/client";
import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import {BsFillPeopleFill} from "react-icons/bs"
export default function JumlahUser() {
    const { data, error, loading } = useQuery(gql`
    {
        users {
            _id,
            
          }
      }

`)
      if(loading) return <Skeleton sx={{width:"100%", height:"100%"}} />
    return(
        <>
        <Card >
                <CardContent >
                    <Grid container marginX={"2rem"} marginY={"1rem"}>
                        <BsFillPeopleFill size={"3rem"} style={{ color: "#00CFE7", backgroundColor: "#D6F7FB" }} />
                    </Grid>
                    <Typography variant="h6" textAlign={"center"} fontWeight={"bolder"} fontFamily={"'Poppins', sans-serif"}>
                        Jumlah User
                    </Typography>
                    <Typography variant="h5" textAlign={"center"}>
                        {
                            (!error && !loading) && data.users.length
                        }
                    </Typography>
                </CardContent>

            </Card>
        </>
    )
}