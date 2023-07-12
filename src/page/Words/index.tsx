import {
    Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Divider
    , Grid, Button, TextField, styled, tableCellClasses, Box, Typography, ButtonGroup
} from "@mui/material"
import { createContext, useContext, useMemo, useState } from "react"
import { CustomActionButton, SmallColoredButton } from "../../component/buttons"
import { Input } from "@mui/icons-material"
import AddWord from "./addWord"
import { gql, useMutation, useQuery } from "@apollo/client"
import Swal from "sweetalert2"
import { Loading, Question } from "../../util/swal"

const RowCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
        color: "#443D45"
    }
})


type InputType = {
    data : any,
    open : boolean,
    setOpen : any,
    setInputData : any
}

const InputProvider = createContext<InputType>({
    data : null,
    open : false,
    setOpen : () => {},
    setInputData : () => {}
})

export const useWord = () => useContext(InputProvider)

const KelasKata: { [key: string]: string } = {
    "n": "Benda",
    "v": "Kerja"
}


export default function Words() {
    const [page, setPage] = useState(0)
    const [rows, setRows] = useState(10)
    const { data, error, loading, refetch } = useQuery(gql`
    {
        words {
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

`)
      const dataShow = useMemo(() => {
        if(data?.words == null) return []
        if(data?.words.length == 0) return []
        return data.words.slice(page * rows, page * rows + rows)
      }, [data, page, rows])
    const [deleteWord] = useMutation(gql`
        mutation RemoveWord($id: String!) {
        removeWord(id: $id) {
          _id
        }
      }
    `)
    const [inputData, setInputData] = useState(null)
    const [open, setOpen] = useState(false)
    async function removeWord(id : string) {
        try {
            const {isConfirmed} = await Question.fire({
                text : "Apakah anda ingin menghapus kata ini?"
            })

            if(!isConfirmed) return
            Loading.fire()
            await deleteWord({variables : {
                id
            }})
            Swal.fire("Berhasil" , "", "success")
            refetch()
        }catch(err) {
            console.error(err)
            Swal.fire("Gagal" , "", "error")
        }
    }
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
        <InputProvider.Provider value={{data :  inputData, open : open, setOpen, setInputData }}>
            <TableContainer component={Paper} sx={{ width: "97%" }}>
                <Grid container direction={"row-reverse"} spacing={2} alignItems={"center"} paddingRight={"1rem"} marginY="1rem" >
                    <Grid item>
                        <AddWord refetch={refetch}/>
                    </Grid>
                    <Grid item>
                        <TextField hiddenLabel placeholder="search" size="small" variant="outlined" />
                    </Grid>
                </Grid>
                <Divider />
                <div style={{overflowX:"auto"}}>

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
                                            {(page * rows)+(ind + 1)}
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
                                        <TableCell>
                                            <ButtonGroup>
                                                <SmallColoredButton onClick={() => {
                                                    removeWord(el._id)
                                                }} color="red"  >
                                                    Delete
                                                </SmallColoredButton>
                                                <SmallColoredButton color="blue" onClick={() => {
                                                    setOpen(true)
                                                    setInputData(el)
                                                    console.log(el)
                                                }}>
                                                    Edit
                                                </SmallColoredButton>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>

                <TablePagination
                    component="div"
                    count={data.words.length}
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