import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Divider
, Grid, Button, TextField, styled,tableCellClasses
} from "@mui/material"
import { useState } from "react"
import { CustomActionButton } from "../../component/buttons"
import { Input } from "@mui/icons-material"
import AddWord from "./addWord"
const tempData = [
    {
        kata: "alena",
        arti: "dia"
    },
    {
        kata: "maneng",
        arti: "semua"
    }
]

const RowCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`] : {
        color : "#443D45"
    }
})

export default function Words() {
    const [page, setPage] = useState(0)
    const [rows, setRows] = useState(10)
    return (
        <>
            <TableContainer component={Paper} sx={{ width:"97%"}}>
                <Grid container direction={"row-reverse"} spacing={2} alignItems={"center"} paddingRight={"1rem"} marginY="1rem" >
                    <Grid item>
                        <AddWord/>
                    </Grid>
                    <Grid item>
                        <TextField hiddenLabel placeholder="search" size="small" variant="outlined" />
                    </Grid>
                </Grid>
                <Divider/>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tempData.map((el, ind) => (
                                <TableRow>
                                    <TableCell>
                                        {ind + 1}
                                    </TableCell>
                                    <TableCell>
                                        {el.kata}
                                    </TableCell>
                                    <TableCell>
                                        {el.arti}
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