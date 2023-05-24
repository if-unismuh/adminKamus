import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  document.title = "Login";
  const nav = useNavigate()
  return (
    <div className="ml-[2.5vw] gap-[7vw] flex mr-[5vw] mt-[3vh]">
      <div className="w-[50vw] h-[100vh]  bg-[#F8F7FA] rounded-[1rem]"></div>
      <div className="w-[31vw] h-[100vh] flex items-center">
        <div className="">
          <img src="" alt="" className="h-[13vh]" />
          <h1 className="text-2xl font-semibold">
            Selamat Datang di Admin Kamus
          </h1>
          <p className="text-3xl text-[#85838A] mt-[2vh]">
            
          </p>
          <div className="mt-[6vh]">
            <TextField
              fullWidth
              id="login-text"
              label="Email"
              variant="outlined"
            />
            <TextField
              fullWidth
              sx={{ marginTop: "2.5vh" }}
              type="password"
              id="password-text"
              label="Password"
              variant="outlined"
            />
          </div>
          <div className="flex justify-between items-center mt-[2vh]">
            <FormControlLabel
              control={<Checkbox name="remember" defaultChecked />}
              label="Remember Me"
            />
            <Link to="/" className="text-[blue] flex items-center">
              Lupa Password?
            </Link>
          </div>
          <button onClick={() => {
            nav("/")
          }} className="bg-[blue] w-full rounded-md py-[15px] text-[white] font-bold mt-[2.5vh]">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
