import {
    Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Divider
    , Grid, Button, TextField, styled, tableCellClasses, Box, Typography
} from "@mui/material"
import { useState } from "react"
import { CustomActionButton } from "../../component/buttons"
import { Input } from "@mui/icons-material"
import AddWord from "./addWord"
import { gql, useQuery } from "@apollo/client"

const RowCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
        color: "#443D45"
    }
})



export default function Words() {
    const [page, setPage] = useState(0)
    const [rows, setRows] = useState(10)
    const { data, error, loading } = useQuery(gql`
    {
        words {
          _id
          lexem
          definition
          example
          sense_number
          phonetic_form
          example_gloss
        }
      }

`)
    if (loading) return <></>
    if (error) return <Box >
        <Grid container minHeight={"50vh"} justifyContent={"center"} alignItems={"center"} direction={"column"}>
            <Grid item>
                <Typography variant="h2">
                    Error
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h5" textAlign={"center"} paddingTop={"3rem"}>
                    {error.name}
                </Typography>
                <Typography variant="h6" textAlign={"center"}>
                    {error.message}
                </Typography>
            </Grid>
        </Grid>
    </Box>
    return (
        <>
            <TableContainer component={Paper} sx={{ width: "97%" }}>
                <Grid container direction={"row-reverse"} spacing={2} alignItems={"center"} paddingRight={"1rem"} marginY="1rem" >
                    <Grid item>
                        <AddWord />
                    </Grid>
                    <Grid item>
                        <TextField hiddenLabel placeholder="search" size="small" variant="outlined" />
                    </Grid>
                </Grid>
                <Divider />
                <Table>
                    <TableHead sx={{
                        backgroundColor: '#e0e0e0'
                    }}>
                        <TableRow>
                            <RowCell>
                                No
                            </RowCell>
                            <RowCell>
                                Kata
                            </RowCell>
                            <RowCell>
                                Arti
                            </RowCell>
                            <RowCell>
                                Pelafalan
                            </RowCell>
                            <RowCell>
                                Contoh
                            </RowCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            data.words.map((el: any, ind: number) => (
                                <TableRow>
                                    <TableCell>
                                        {ind + 1}
                                    </TableCell>
                                    <TableCell>
                                        {el.lexem}
                                    </TableCell>
                                    <TableCell>
                                        {el.definition}
                                    </TableCell>
                                    <TableCell>
                                        {el.phonetic_form}
                                    </TableCell>

                                    <TableCell>
                                        {el.example} : {el.example_gloss}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={(ev, newpage) => {
                        setPage(newpage)
                    }}
                    rowsPerPage={rows}
                    onRowsPerPageChange={(ev) => {
                        setRows(parseInt(ev.target?.value, 10));
                        setPage(0);
                    }}
                />
            </TableContainer>
        </>
    )
}