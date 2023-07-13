import { CustomActionButton } from "../../component/buttons";
import { Drawer, Box, Typography, Grid, TextField, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import apollo from "../../util/graphql";
import { gql, useMutation } from "@apollo/client";
import { useUser } from ".";

type Inputs = {
    email: string,
    password: string,
    namaLengkap: string
    role: string
    
}

const header = [
    "Email", "Password", "Nama Lengkap", "Role"
]

const keys = [
    "email", 
    "password",
    "namaLengkap",
    "role",
]




export default function AddUser({ refetch }: { refetch: any }) {
    const {open, setOpen, inputData, setInputData} = useUser()
    const [isLoading, setIsLoading] = useState(false);
    const { register, setValue,formState: { errors }, handleSubmit, reset, setError } = useForm<Inputs>({
        mode: "onBlur",
        resolver: zodResolver(z.object({
            email: z.string().nonempty("Tidak boleh kosong").email(),
            password: z.string().nonempty("Tidak boleh kosong"),
            namaLengkap: z.string().nonempty("Tidak boleh kosong"),
            role: z.string().nonempty("Tidak boleh kosong"),
            
        })),
        values : {
            ...inputData,
            definition : inputData?.definition.join(","),
            example : inputData?.example.join(","),
            example_gloss : inputData?.example_gloss.join(",")
        }
    })



    const [addWord, { data, error }] = useMutation(gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(createUserInput: $input) {
          _id
        }
      }
        
              
    `)
    const [editWord] = useMutation(gql`
    mutation UpdateWord($id: String!, $input: UpdateWordInput!) {
        updateWord(id: $id, updateWordInput: $input) {
            _id
        }
      }
             
    `)



    async function CreateData(data: Inputs) {
        try {
            setIsLoading(true)
            if(inputData != null) {
                await editWord({variables : {id : inputData._id, input : data}})
            } else {
                await addWord({ variables: { input: data } })
            }
            refetch();
            reset()
            if(inputData != null) {
                setInputData(null)
                setOpen(false)
            }
        } catch (err) {
            setError("email", { message: "Error" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <CustomActionButton variant="contained" onClick={() => setOpen(true)}>
                Tambah User
            </CustomActionButton>

            <Drawer
                open={open}
                onClose={() => {
                    if (isLoading) return
                    reset()
                    setOpen(false)
                    setInputData(null)
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
                                            <TextField label={el} type="number" fullWidth {...register(keys[ind] as keyof Inputs, { valueAsNumber: true })} error={!!errors[keys[ind] as keyof Inputs]} helperText={errors[keys[ind] as keyof Inputs]?.message || ""} /> :
                                            keys[ind] == "part_of_speech" ?
                                                <>
                                                    <FormControl fullWidth error={!!errors[keys[ind] as keyof Inputs]} >
                                                        <InputLabel id="demo-simple-select-label">{el}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Age"
                                                            defaultValue={inputData?.[keys[ind]] as keyof Inputs}
                                                            {...register(keys[ind] as keyof Inputs)}
                                                        >
                                                            <MenuItem value={"n"}>Benda</MenuItem>
                                                            <MenuItem value={"v"}>Kerja</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {
                                                        errors[keys[ind] as keyof Inputs] != null && 
                                                        <Typography variant="body2" color={"red"}>
                                                            {errors[keys[ind] as keyof Inputs]?.message}
                                                        </Typography> 
                                                    }
                                                </>
                                                :
                                                <TextField label={el} fullWidth {...register(keys[ind] as keyof Inputs)} error={!!errors[keys[ind] as keyof Inputs]} helperText={errors[keys[ind] as keyof Inputs]?.message || ""} />
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
                                    {
                                        inputData == null ? "Tambah" : "Edit"
                                    }
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