import { CustomActionButton } from "../../component/buttons";
import {Drawer, Box, Typography, Grid, TextField} from "@mui/material"
import {useState} from "react"
import {useForm} from "react-hook-form"

import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"

type Inputs = {
    kata : string,
    arti : string,
}

export default function AddWord() {

    const [open, setOpen] = useState(false);
    const {register, formState : {errors}, handleSubmit} = useForm<Inputs>({
        mode : "onBlur",
        resolver : zodResolver(z.object({
            kata : z.string().nonempty("Tidak boleh kosong"),
            arti : z.string().nonempty("Tidak boleh kosong"),
        }))
    })

    async function CreateData(data : Inputs) {
        console.log(data)
    }

    return (
        <>
            <CustomActionButton variant="contained"onClick={() => setOpen(true)}>
                Tambah Data
            </CustomActionButton>

            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor="right"
            >   
                <Box sx={{
                    padding :"2rem",
                    minWidth : "20vw"
                }} component={"form"}  onSubmit={handleSubmit(CreateData)} >
                    <Grid container direction={"column"} spacing={3} >
                        <Grid item>
                            <Typography variant="h5" fontFamily={"'Poppins', sans-serif"}>
                                Input Kata
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField label="Kata" fullWidth {...register("kata")} error={!!errors.kata} helperText={errors.kata?.message || ""} />
                        </Grid>
                        <Grid item>
                            <TextField label="Arti" fullWidth {...register("arti")} error={!!errors.arti} helperText={errors.arti?.message || ""} />
                        </Grid>
                        <Grid item>
                            <CustomActionButton fullWidth variant="contained" type="submit">
                                Tambah
                            </CustomActionButton>
                        </Grid>
                    </Grid>
                </Box>  
            </Drawer>
        </>
    )
}