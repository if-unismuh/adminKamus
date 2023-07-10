import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export default function useNavigate2() {
    const nav = useNavigate()
    const {setLoading} = useAuth()
    async function navigate(path : string) {
        setLoading(true)
        nav(path)
    }

    return navigate


} 