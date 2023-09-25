import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ISubEntry, IWords, ZSubEntry, ZWords } from "../../types/words";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { MuiChipsInput } from "mui-chips-input";
import { CustomActionButton } from "../../component/buttons";
import { useState } from "react";
import { z } from "zod";
import { KelasKata } from ".";

const header = [
    "Lema",
    "Nomor Polisemi", 
    "Nomor Homonim", 
    "Lafal",
    "Kelas Kata",
    "Definisi", 
    "Contoh(Bahasa asal)", 
    "Contoh(Bahasa Indonesia)", 
    
]

const keys = [
    "lexem",
    "sense_number",
    "homonym_number",
    "phonetic_form",
    "part_of_speech",
    "definition",
    "example",
    "example_gloss",
    
]

type keysType = "lexem" |
    "definition" |
    "example" |
    "example_gloss" |
    "sense_number" |
    "homonym_number" |
    "phonetic_form" |
    "part_of_speech"


const HeaderSubEntry = [
    "Sub Entri", 
    "Nomor Polisemi", 
"Nomor Homonim", 
"Lafal",
"Kelas Kata",
"Definisi", 
"Contoh(Bahasa asal)", 
"Contoh(Bahasa Indonesia)", 

]
const KeysSubEntry = ["sub_entry", 
"sense_number",
"homonym_number",
"phonetic_form",
"part_of_speech",
"definition",
"example",
"example_gloss",

]

export default function AddWordItem({ ind, item, onChange, hapus }: { ind: number, item: any, onChange: any, hapus : any }) {
    const { control, register, setValue, formState: { errors }, handleSubmit, reset, setError } = useForm<IWords>({
        mode: "onBlur",
        resolver: zodResolver(ZWords),
        values: {
            ...item,
        }
    })

    return (
        <>
            <Grid container justifyContent={"space-between"} mb={2}>
                <Grid item>
                    <Typography variant="h5" sx={{ color: "grey" }}>
                        Item ke {ind + 1} {item.definition}
                    </Typography>
                </Grid>
                <Grid item>
                    <CustomActionButton variant="contained" onClick={hapus} >Hapus</CustomActionButton>
                </Grid>
            </Grid>
            <Box sx={{ border: "1px solid grey", borderRadius: "1rem", paddingY: 3, marginLeft: -1, paddingX: 1 }}>
                <Grid container rowSpacing={2} spacing={1}>
                    {
                        header.map((el, ind) => (
                            <Grid item key={el} xl={4} md={6} xs={12} >
                                {
                                    ["definition", "example_gloss", "example"].includes(keys[ind]) ?

                                        <MuiChipsInput fullWidth value={item[keys[ind]] as any} onChange={(ev) => {
                                            onChange(keys[ind], ev)
                                        }} hideClearAll label={el} sx={{}} />


                                        :
                                        ["homonym_number", "sense_number"].includes(keys[ind]) ?
                                            <TextField label={el} type="number" fullWidth value={item[keys[ind]] as any} onChange={(ev) => {
                                                onChange(keys[ind], parseInt(ev.target.value))
                                            }} error={!!errors[keys[ind] as keysType]} helperText={errors[keys[ind] as keysType]?.message || ""} /> :
                                            keys[ind] == "part_of_speech" ?
                                                <>
                                                    <FormControl fullWidth error={!!errors[keys[ind] as keysType]} >
                                                        <InputLabel id="demo-simple-select-label">{el}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label={el}
                                                            value={item[keys[ind]] as any}
                                                            onChange={(ev) => {
                                                                onChange(keys[ind], ev.target.value)
                                                            }}
                                                        >
                                                            <MenuItem value={"u"}>Belum Diketahui</MenuItem>
                                                            {
                                                            Object.keys(KelasKata).map(el => <MenuItem value={el}>{KelasKata[el as keyof typeof KelasKata]}</MenuItem>)
                                                         }
                                                        </Select>
                                                    </FormControl>

                                                </>
                                                :
                                                <TextField label={el} fullWidth value={item[keys[ind]] as any} onChange={(ev) => {
                                                    onChange(keys[ind], ev.target.value)
                                                }} helperText={errors[keys[ind] as keysType]?.message || ""} />
                                }

                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container sx={{ width: "100%" }}>
                    {
                        item?.relatedWords?.map((el: any, ind: number) => <Grid item sx={{ width: "90%", marginTop: 2, marginLeft: 2 }}>
                            <AddWordItemSub hapus={() => {
                                const temp: any = structuredClone(item.relatedWords)
                                onChange("relatedWords", temp.filter((el: any, ind2: number) => {
                                    return ind2 != ind
                                }))
                            }} ind={ind} item={item.relatedWords[ind]} onChange={(keys: string, val: any) => {
                                const temp: any = structuredClone(item.relatedWords)
                                temp[ind][keys] = val
                                onChange("relatedWords", temp)


                            }} />
                        </Grid>)
                    }
                </Grid>
                <Grid container justifyContent={"flex-end"} mt={2}>
                    <Grid item>
                        <CustomActionButton variant="contained" onClick={() => {
                            const temp  = structuredClone(item.relatedWords)
                            temp.push({
                                definition: [],
                                    example: [],
                                    example_gloss: [],
                                    homonym_number: 0,
                                    sub_entry: "",
                                    part_of_speech: "n",
                                    phonetic_form: "",
                                    sense_number: 0,
                            })
                            onChange("relatedWords", temp)

                        }}  >
                            Tambah Sub Kata
                        </CustomActionButton>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

function AddWordItemSub({ ind, item, onChange, hapus }: { ind: number, item: any, onChange: any, hapus: any }) {

    return (
        <Box>
            <Grid container justifyContent={"space-between"} sx={{ marginBottom: 2 }} >
                <Grid item>
                    <Typography variant="h5" color={"grey"}>Sub Kata ke {ind + 1}</Typography>
                </Grid>
                <Grid item>
                    <CustomActionButton variant="contained" onClick={hapus}>Hapus</CustomActionButton>
                </Grid>
            </Grid>
            <Grid container rowSpacing={2}>
                {
                    HeaderSubEntry.map((el, ind) => (
                        <Grid item key={el} xl={4} md={6} xs={12}  >
                            {
                                ["definition", "example_gloss", "example"].includes(KeysSubEntry[ind]) ?
                                    <MuiChipsInput fullWidth value={item[KeysSubEntry[ind]]} onChange={(ev) => {
                                        onChange(KeysSubEntry[ind], ev)
                                    }} label={el} sx={{}} />
                                    :
                                    ["homonym_number", "sense_number"].includes(KeysSubEntry[ind]) ?
                                        <TextField label={el} type="number" fullWidth value={item[KeysSubEntry[ind]]} onChange={(ev) => {
                                            onChange(KeysSubEntry[ind], parseInt(ev.currentTarget.value))
                                        }} /> :
                                        KeysSubEntry[ind] == "part_of_speech" ?
                                            <>
                                                <FormControl fullWidth  >
                                                    <InputLabel id="demo-simple-select-label">{el}</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label={el}
                                                        value={item[KeysSubEntry[ind]]}
                                                        onChange={(ev) => {
                                                            onChange(KeysSubEntry[ind], ev.target.value)
                                                        }}
                                                    >
                                                         <MenuItem value={"u"}>Belum Diketahui</MenuItem>
                                                         {
                                                            Object.keys(KelasKata).map(el => <MenuItem value={el}>{KelasKata[el as keyof typeof KelasKata]}</MenuItem>)
                                                         }
                                                            
                                                           
                                                    </Select>
                                                </FormControl>

                                            </>
                                            :
                                            <TextField label={el} fullWidth value={item[KeysSubEntry[ind]]} onChange={(ev) => {
                                                onChange(KeysSubEntry[ind], ev.currentTarget.value)
                                            }} />
                            }

                        </Grid>
                    ))
                }
            </Grid>
        </Box>

    )
}