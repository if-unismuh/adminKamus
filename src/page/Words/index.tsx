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
import { IWords } from "../../types/words"
import AddWordItem from "./addWordItem"

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

export const KelasKata = {
    "n": "Benda",
    "v": "Kerja",
    "adv": "Keterangan",
    "adj": "Sifat",
    "pron": "Ganti",
    "pr" : "Depan",
    "num" : "Angka"                                                                
} as const

type kelasKata = keyof typeof KelasKata | "all"

export default function Words() {
    document.title = "words"
    const [page, setPage] = useState(0)
    const [rows, setRows] = useState(10)
    const [filter, setFilter] = useState<{
        kelasKata : kelasKata
    }>({
        kelasKata: "all"
    })

    const [isAdding, setIsAdding] = useState(false)
    const [tempAddingItems, setTempAdding] = useState<IWords[]>([])
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
        variables: {
            query: search
        }
    })
    const dataShow = useMemo(() => {

        if (data?.search == null) return []
        if (data?.search.length == 0) return []

        return data.search.filter((el: any) => {
            if (filter.kelasKata != "all" && filter.kelasKata != el.part_of_speech) return false;
            return true
        }).slice(page * rows, page * rows + rows)
    }, [data, page, rows, filter])
    const dataLength = useMemo(() => {
        if (data == null) return 0
        console.log(data)
        return data?.search?.filter((el: any) => {
            if (filter.kelasKata != "all" && filter.kelasKata != el.part_of_speech) return false;
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

    const [addWord] = useMutation(gql`
    mutation CreateWord($input: CreateWordInput!) {
        createWord(createWordInput: $input) {
          _id
          lexem
          definition
          example
          example_gloss
          sense_number
          homonym_number
          sub_entry
          phonetic_form
          part_of_speech
          related_words_id
          
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

    async function tambahData() {
        try {
            console.log(tempAddingItems)
            if(tempAddingItems.length == 0) return
            Loading.fire()
            for(let i = 0 ; i < tempAddingItems.length;i++) {
                const {relatedWords, ...data} = tempAddingItems[i]
                const parents = await addWord({
                    variables : {
                        input : data
                    }
                })
                console.log(parents)
                for(let j = 0; j < relatedWords.length; j++) {
                    await addWord({
                        variables : {
                            input : {
                                related_words_id : parents.data.createWord._id,
                                ...relatedWords[j]
                            }
                        }
                    })
                }
            
            }
            Swal.fire("Berhasil", "", "success")
            setTempAdding([])
            refetch()
        }catch(err) {
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
                                        { borderColor: '#4942E4' }
                                }
                            }}
                            onChange={(ev) => {
                                setFilter(el => ({ ...el, kelasKata: ev.target.value as kelasKata }))
                                setRows(10)
                                setPage(0)
                            }
                            }

                        >
                            <StyledMenu value={"all"}>Pilih Kelas Kata</StyledMenu>
                            {
                                Object.keys(KelasKata).map( (el : any ) => <StyledMenu value={el}>{KelasKata[el as typeof keyof KelasKata]}</StyledMenu>)
                            }
                        </Select>
                    </Grid>

                </Grid>
                <Divider sx={{ marginTop: "1.5rem" }} />
                <Grid container direction={"row-reverse"} spacing={2} alignItems={"center"} paddingRight={"1rem"} marginY="1rem" >
                    <Grid item>
                        <CustomActionButton variant="contained" onClick={() => {
                            if(!isAdding) {
                                setIsAdding(true)
                                return
                            }
                            console.log(tempAddingItems)
                            tambahData()
                        }}  >
                            Tambah
                        </CustomActionButton>
                    </Grid>
                    <Grid item>
                        <TextField hiddenLabel value={search} onChange={(ev) => {
                            setSearch(ev.target.value);
                        }} placeholder="search" size="small" variant="outlined" />
                    </Grid>
                </Grid>
                <Divider />
                {
                    isAdding && <>

                        <Grid container spacing={2} sx={{ marginX: 2, marginY: 2, width : "100%" }}>
                            {
                                tempAddingItems.map((el, ind) =>
                                    <Grid item sx={{width : "80%"}}>
                                        <AddWordItem hapus={() => {
                                            setTempAdding(el => {
                                                const temp : any = structuredClone(el)
                                                

                                                return temp.filter((el: any, ind2 : number) => ind != ind2 )
                                            })
                                        }} onChange={(keys : string, val : any) => {
                                            setTempAdding(el => {
                                                const temp : any = structuredClone(el)
                                                temp[ind][keys] = val

                                                return temp
                                            })
                                        }} ind={ind} item={el} />
                                    </Grid>
                                )
                            }

                        </Grid>
                        <CustomActionButton variant="contained" sx={{ marginX: 2, marginBottom  : 2 }} onClick={() => {
                            setTempAdding(el => {
                                const temp = structuredClone(el)
                                temp.push({
                                    definition: [],
                                    example: [],
                                    example_gloss: [],
                                    homonym_number: 0,
                                    lexem: "",
                                    part_of_speech: "n",
                                    phonetic_form: "",
                                    sense_number: 0,
                                    relatedWords : []
                                })

                                console.log(temp)



                                return temp
                            })
                        }}  >
                            Tambah Lema
                        </CustomActionButton>
                        <Divider />
                    </>
                }
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
                                        Lema
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
                                                {KelasKata[el.part_of_speech as keyof typeof KelasKata ]}
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