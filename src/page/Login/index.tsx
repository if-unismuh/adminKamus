import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { Box, Grid, Typography, Paper, TextField, FormControl, InputLabel, Button, buttonClasses } from "@mui/material";
import { BootstrapInput } from "../../component/inputs";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";

type Inputs = {
  username: string,
  password: string
}

export default function Login() {
  const auth = useAuth()
  const { register, formState: { errors }, setError, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(
      z.object({
        username: z.string().nonempty("Tidak boleh kosong"),
        password: z.string().nonempty("Tidak boleh kosong"),
      })
    ),
    mode: "onBlur",
  })

  async function login(data: Inputs) {
    console.log(data);
    auth.login(data, (err) => {
      Swal.fire("Error", err, "error")
    })
  }

  return (
    <Grid container >
      <Grid item xs={7}  >
        <Box sx={{ height: "99vh", objectFit: "contain" }}>
          <img src="/login.jpg" width={"100%"} height={"100%"} alt="Login" />
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box sx={{ height: "100vh" }} component={"form"} onSubmit={handleSubmit(login)} marginX={"3rem"}>
          <Grid container direction={"column"} spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" fontFamily={"'Merriweather', serif"} sx={{
                marginTop: "5rem",
              }}>
                Selamat Datang di Admin Kamus Bahasa Bugis
              </Typography>
            </Grid>
            <Grid item>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel shrink htmlFor="username-id" sx={{ fontWeight: "bold" }}>
                  Username
                </InputLabel>
                <BootstrapInput size="small" id="username-id" fullWidth {...register("username")} error={!!errors.username} helperText={errors.username?.message || ""}  />
               
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel shrink htmlFor="password-id" sx={{ fontWeight: "bold" }}>
                  Password
                </InputLabel>
                <BootstrapInput type="password" size="small" id="password-id" fullWidth {...register("password")} error={!!errors.password} helperText={errors.password?.message || ""} />
                
              </FormControl>
            </Grid>
            <Grid item marginTop={"2rem"}>
              <Button type="submit" variant="contained" sx={{
                [`&.${buttonClasses.contained}`] : {
                  backgroundColor : "#068FFF",
                  [`&:hover`] : {
                    backgroundColor : "#4E4FEB"
                  },
                  fontFamily : "'Poppins', sans-serif"
                }
              }} fullWidth >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}