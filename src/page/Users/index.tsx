import {
    Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Divider
    , Grid, Button, TextField, styled, tableCellClasses, Box, Typography
} from "@mui/material"
import { SetStateAction, createContext, useContext, useMemo, useState } from "react"
import { CustomActionButton } from "../../component/buttons"
import { Input } from "@mui/icons-material"
import { gql, useMutation, useQuery } from "@apollo/client"
import AddUser from "./addUser"
import ActionButton from "../../component/actionButton"
import { Loading, Question } from "../../util/swal"
import Swal from "sweetalert2"

const RowCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
        color: "#443D45"
    }
})

type ContextType = {
    inputData: any,
    setInputData: any,
    open: boolean,
    setOpen: any
}

const UserContext = createContext<ContextType>({
    inputData: null,
    setInputData: () => { },
    setOpen: null,
    open: false
})

export const useUser = () => useContext(UserContext)

export default function Users() {
    document.title = "Users"
    const [page, setPage] = useState(0)
    const [rows, setRows] = useState(10)
    const [open, setOpen] = useState(false)
    const [inputData, setInputData] = useState(null)
    const { data, error, loading, refetch } = useQuery(gql`
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

    const [deleteUser] = useMutation(gql`
    mutation RemoveUser($id: String!) {
        removeUser(id: $id) {
          _id
        }
    }
    `)

    async function removeWord(id: string) {
        try {
            const { isConfirmed } = await Question.fire({
                text: "Apakah anda ingin menghapus user ini?"
            })

            if (!isConfirmed) return
            Loading.fire()
            await deleteUser({
                variables: {
                    id
                }
            })
            Swal.fire("Berhasil", "", "success")
            refetch()
        } catch (err) {
            console.error(err)
            Swal.fire("Gagal", "", "error")
        }
    }
    const dataShow = useMemo(() => {
        if (data?.users == null) return []
        if (data?.users.length == 0) return []
        return data.users.slice(page * rows, page * rows + rows)
    }, [data, page, rows])

    const dataLength = useMemo(() => {
        if (data == null) return 0
        return data?.users.length
    }, [data, page, rows])


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
        <UserContext.Provider value={{
            open,
            setOpen,
            inputData,
            setInputData
        }}>
            <TableContainer component={Paper} sx={{ width: "97%" }}>
                <Grid container direction={"row-reverse"} spacing={2} alignItems={"center"} paddingRight={"1rem"} marginY="1rem" >
                    <Grid item>
                        <AddUser refetch={refetch} />
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
                            <RowCell>
                                Aksi
                            </RowCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            dataShow.map((el: any, ind: number) => (
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
                                    <TableCell>
                                        <ActionButton hapus={() => {
                                            removeWord(el._id)
                                        }} edit={() => {
                                            setOpen(true)
                                            setInputData(el)
                                        }} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={dataLength}
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
        </UserContext.Provider>
    )
}