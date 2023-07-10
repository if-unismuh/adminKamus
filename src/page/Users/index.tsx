import {
    Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Divider
    , Grid, Button, TextField, styled, tableCellClasses, Box, Typography
} from "@mui/material"
import { useState } from "react"
import { CustomActionButton } from "../../component/buttons"
import { Input } from "@mui/icons-material"
import { gql, useQuery } from "@apollo/client"

const RowCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
        color: "#443D45"
    }
})


export default function Users() {
    const [page, setPage] = useState(0)
    const [rows, setRows] = useState(10)
    const { data, error, loading } = useQuery(gql`
    {
        users {
            _id,
            email,
            password,
            namaLengkap,
            role
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
                                Email
                            </RowCell>
                            <RowCell>
                                Password
                            </RowCell>
                            <RowCell>
                                Nama Lengkap
                            </RowCell>
                            <RowCell>
                                Role
                            </RowCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            data.users.map((el: any, ind: number) => (
                                <TableRow>
                                    <TableCell>
                                        {ind + 1}
                                    </TableCell>
                                    <TableCell>
                                        {el.email}
                                    </TableCell>
                                    <TableCell>
                                        {el.password}
                                    </TableCell>
                                    <TableCell>
                                        {el.namaLengkap}
                                    </TableCell>
                                    <TableCell>
                                        {el.role}
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