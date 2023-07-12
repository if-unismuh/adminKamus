import { CustomActionButton } from "../../component/buttons";
import { Drawer, Box, Typography, Grid, TextField, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import apollo from "../../util/graphql";
import { gql, useMutation } from "@apollo/client";
import { useWord } from ".";

type Inputs = {
    lexem: string,
    definition: string,
    example: string
    example_gloss: string
    sense_number: number
    homonym_number: number,
    sub_entry: string,
    phonetic_form: string
    part_of_speech: string,
    related_words_id: string
}

const header = [
    "Kata", "Definisi", "Contoh(Bahasa asal)", "Contoh(Bahasa Indonesia)", "Nomor Polisemi", "Nomor Homonim", "Entri Sub", "Lafal",
    "Kelas Kata", "Relasi Kata(id)"
]

const keys = [
    "lexem",
    "definition",
    "example",
    "example_gloss",
    "sense_number",
    "homonym_number",
    "sub_entry",
    "phonetic_form",
    "part_of_speech",
    "related_words_id"
]

type keysType = "lexem" |
    "definition" |
    "example" |
    "example_gloss" |
    "sense_number" |
    "homonym_number" |
    "sub_entry" |
    "phonetic_form" |
    "part_of_speech" |
    "related_words_id"


export default function AddWord({ refetch }: { refetch: any }) {
    const {open, setOpen, data : inputData} = useWord()
    const [isLoading, setIsLoading] = useState(false);
    const { register, setValue,formState: { errors }, handleSubmit, reset, setError } = useForm<Inputs>({
        mode: "onBlur",
        resolver: zodResolver(z.object({
            lexem: z.string().nonempty("Tidak boleh kosong"),
            definition: z.preprocess((data: any) => data.split(","), z.array(z.string().nonempty("Tidak boleh kosong"))),
            example: z.preprocess((data: any) => data.split(","), z.array(z.string().nonempty("Tidak boleh kosong"))),
            homonym_number: z.number().int(),
            sense_number: z.number().int(),
            sub_entry : z.string().nonempty(),
            phonetic_form: z.string().nonempty("Tidak boleh Kosong"),
            part_of_speech: z.string().nonempty("Tidak boleh Kosong"),
            example_gloss: z.preprocess((data: any) => data.split(","), z.array(z.string().nonempty("Tidak boleh kosong"))),
            related_words_id: z.string().nonempty("Tidak boleh kossong"),
        })),
        values : {
            ...inputData
        }
    })



    const [addWord, { data, error }] = useMutation(gql`
    mutation CreateWord($input: CreateWordInput!) {
        createWord(createWordInput: $input) {
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

    async function CreateData(data: Inputs) {
        try {
            console.log("Oke")
            console.log(data)
            setIsLoading(true)
            const result = await addWord({ variables: { input: data } })
            refetch();

        } catch (err) {
            setError("lexem", { message: "Error" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <CustomActionButton variant="contained" onClick={() => setOpen(true)}>
                Tambah Data
            </CustomActionButton>

            <Drawer
                open={open}
                onClose={() => {
                    if (isLoading) return
                    setOpen(false)
                    reset()
                }}
                anchor="right"
            >
                <Box sx={{
                    padding: "2rem",
                    minWidth: "20vw"
                }} component={"form"} onSubmit={handleSubmit(CreateData)} >
                    <Grid container direction={"column"} spacing={3} >
                        <Grid item>
                            <Typography variant="h5" fontFamily={"'Poppins', sans-serif"}>
                                Input Kata
                            </Typography>
                        </Grid>

                        {
                            header.map((el, ind) => (
                                <Grid item key={el}>
                                    {
                                        ["homonym_number", "sense_number"].includes(keys[ind]) ?
                                            <TextField label={el} type="number" fullWidth {...register(keys[ind] as keysType, { valueAsNumber: true })} error={!!errors[keys[ind] as keysType]} helperText={errors[keys[ind] as keysType]?.message || ""} /> :
                                            keys[ind] == "part_of_speech" ?
                                                <>
                                                    <FormControl fullWidth error={!!errors[keys[ind] as keysType]} >
                                                        <InputLabel id="demo-simple-select-label">{el}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Age"
                                                            defaultValue={inputData?.[keys[ind]] as keysType}
                                                            {...register(keys[ind] as keysType)}
                                                        >
                                                            <MenuItem value={"n"}>Benda</MenuItem>
                                                            <MenuItem value={"v"}>Kerja</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {
                                                        errors[keys[ind] as keysType] != null && 
                                                        <Typography variant="body2" color={"red"}>
                                                            {errors[keys[ind] as keysType]?.message}
                                                        </Typography> 
                                                    }
                                                </>
                                                :
                                                <TextField label={el} fullWidth {...register(keys[ind] as keysType)} error={!!errors[keys[ind] as keysType]} helperText={errors[keys[ind] as keysType]?.message || ""} />
                                    }

                                </Grid>
                            ))
                        }
                        {
                            error != null &&
                            <Typography variant="body2" sx={{ color: "red" }}>
                                {error?.message}
                            </Typography>
                        }

                        {
                            !isLoading ? <Grid item>
                                <CustomActionButton fullWidth variant="contained" type="submit" >
                                    Tambah
                                </CustomActionButton>
                            </Grid> :
                                <Grid item justifySelf={"center"} alignSelf={"center"}>

                                    <CircularProgress />
                                </Grid>
                        }

                    </Grid>
                </Box>
            </Drawer>
        </>
    )
}