import {
    Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Divider
    , Grid, Button, TextField, styled, tableCellClasses, Box, Typography, ButtonGroup, Select, MenuItem, IconButton
} from "@mui/material"
import { createContext, useContext, useMemo, useState } from "react"
import { CustomActionButton, SmallColoredButton } from "../../component/buttons"
import { Input } from "@mui/icons-material"
import AddWord from "./addWord"
import { gql, useMutation, useQuery } from "@apollo/client"
import Swal from "sweetalert2"
import { Loading, Question } from "../../util/swal"
import { StyledMenu, StyledSelect } from "../../component/select"
import ActionButton from "../../component/actionButton"

const RowCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
        color: "#443D45"
    }
})


type InputType = {
    data: any,
    open: boolean,
    setOpen: any,
    setInputData: any
}

const InputProvider = createContext<InputType>({
    data: null,
    open: false,
    setOpen: () => { },
    setInputData: () => { }
})

export const useWord = () => useContext(InputProvider)

const KelasKata: { [key: string]: string } = {
    "n": "Benda",
    "v": "Kerja"
}

interface Filter {
    kelasKata: "n" | "v" | "all",

}


export default function Words() {
    document.title = "words"
    const [page, setPage] = useState(0)
    const [rows, setRows] = useState(10)
    const [filter, setFilter] = useState<Filter>({
        kelasKata: "all"
    })
    const [search, setSearch] = useState<string>("")
    const { data, error, loading, refetch } = useQuery(gql`
    query SearchQuery($query: String!) {
        search(query: $query) {
          _id
          lexem
          definition
          example
          homonym_number
          phonetic_form
          example_gloss
          part_of_speech
          sense_number
          sub_entry
          related_words_id

        }
      }

`, {
    variables : {
        query : search
    }
})
    const dataShow = useMemo(() => {
            
        if (data?.search == null) return []
        if (data?.search.length == 0) return []
        return data.search.filter((el: any) => {
            if(filter.kelasKata != "all" && filter.kelasKata != el.part_of_speech) return false;
            return true
        }).slice(page * rows, page * rows + rows)
    }, [data, page, rows, filter])
    const dataLength = useMemo(() => {
        if(data == null) return 0
        console.log(data)
       return data?.search?.filter((el : any) => {
         if(filter.kelasKata != "all" && filter.kelasKata != el.part_of_speech) return false;
        return true
       }).length
    }, [data, page, rows, filter])
    const [deleteWord] = useMutation(gql`
        mutation RemoveWord($id: String!) {
        removeWord(id: $id) {
          _id
        }
      }
    `)
    const [inputData, setInputData] = useState(null)
    const [open, setOpen] = useState(false)
    async function removeWord(id: string) {
        try {
            const { isConfirmed } = await Question.fire({
                text: "Apakah anda ingin menghapus kata ini?"
            })

            if (!isConfirmed) return
            Loading.fire()
            await deleteWord({
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
        <InputProvider.Provider value={{ data: inputData, open: open, setOpen, setInputData }}>
            <TableContainer component={Paper} sx={{ width: "97%" }}>
                <Typography margin={"1rem"} variant="h6" fontFamily={"'Poppins', sans-serif"}>
                    Filter
                </Typography>
                <Grid container sx={{ marginTop: "1.5rem", marginX: "1rem" }}>
                    <Grid item xs={4}>
                    <Select
                        value={filter.kelasKata}
                        size="small"
                        fullWidth
                        variant="outlined"
                        sx={{
                            '& .MuiSelect-select': {
                              color: 'grey', // Set your desired color here
                            },
                            '&.MuiOutlinedInput-root': { 
                                '&:hover .MuiOutlinedInput-notchedOutline': 
                                { borderColor: '#4942E4' }, 
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': 
                                { borderColor: '#4942E4' } }
                          }}
                        onChange={(ev) => {
                            setFilter(el => ({...el, kelasKata : ev.target.value as Filter["kelasKata"]}) )
                            setRows(10)
                            setPage(0)
                        }
                        }

                    >
                        <StyledMenu value={"all"}>Pilih Kelas Kata</StyledMenu>
                        <StyledMenu value={"n"}>Kata Benda</StyledMenu>
                        <StyledMenu value={"v"}>Kata Kerja</StyledMenu>
                    </Select>
                    </Grid>

                </Grid>
                <Divider sx={{ marginTop: "1.5rem" }} />
                <Grid container direction={"row-reverse"} spacing={2} alignItems={"center"} paddingRight={"1rem"} marginY="1rem" >
                    <Grid item>
                        <AddWord refetch={refetch} />
                    </Grid>
                    <Grid item>
                        <TextField hiddenLabel value={search} onChange={(ev) => {
                            setSearch(ev.target.value);
                        }} placeholder="search" size="small" variant="outlined" />
                    </Grid>
                </Grid>
                <Divider />
                {
                    !loading && <div style={{ overflowX: "auto" }}>

                    <Table sx={{ overflowX: "auto" }}>
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
                                    Definisi
                                </RowCell>
                                <RowCell>
                                    Pelafalan
                                </RowCell>
                                <RowCell>
                                    Contoh
                                </RowCell>
                                <RowCell>
                                    Sub Lema
                                </RowCell>
                                <RowCell>
                                    Nomor Homonim
                                </RowCell>
                                <RowCell>
                                    Nomor Polisemi
                                </RowCell>
                                <RowCell>
                                    Kelas Kata
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
                                            {(page * rows) + (ind + 1)}
                                        </TableCell>
                                        <TableCell>
                                            {el.lexem}
                                        </TableCell>
                                        <TableCell>
                                            {el.definition.join(',')}
                                        </TableCell>
                                        <TableCell>
                                            {el.phonetic_form}
                                        </TableCell>
                                        <TableCell>
                                            {el.example.map((el2: string, ind: string) => el2 + " : " + el.example_gloss[ind]) + (ind < (el.example.length - 1) ? "," : "")}
                                        </TableCell>
                                        <TableCell>
                                            {el.sub_entry}
                                        </TableCell>
                                        <TableCell>
                                            {el.homonym_number}
                                        </TableCell>
                                        <TableCell>
                                            {el.sense_number}
                                        </TableCell>
                                        <TableCell>
                                            {KelasKata[el.part_of_speech]}
                                        </TableCell>
                                        <TableCell >
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
                </div>
                }
                

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
        </InputProvider.Provider>
    )
}