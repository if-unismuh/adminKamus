import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

class AuthError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "Auth Error"
    }
}

type ContextType = {
    user?: null | User
    isLoading: boolean
    login: ({ username, password }: { username: string, password: string }, cbErr: (err: string) => void) => void,
    logout: () => void,
    setLoading : any
}

export const AuthContext = createContext<ContextType>({
    user: null,
    isLoading: true,
    login: ({ username, password }: { username: string, password: string }, cbErr) => { },
    logout: () => { },
    setLoading : null
});

const userTemp = {
    username: "Test",
    password: "Test",
    role: "admin",
}

export default function Auth({ children }: { children: React.ReactNode }) {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const nav = useNavigate()
    const loc = useLocation()


    async function login({ username, password }: { username: string, password: string }, cbErr: (err: string) => void) {
        try {
            if (!(username == userTemp.username && password == userTemp.password)) {
                return cbErr("Username atau password tidak valid")
            }


            window.localStorage.setItem('user', JSON.stringify(userTemp))
            setUser({ username: userTemp.username, role: userTemp.role, id: 1 },)

            const searchParams = new URLSearchParams(loc.search)
            console.log(searchParams)

            nav(searchParams.get("cb") || "/")
        } catch (err) {
            console.log(err);
            cbErr("Server Error")
        }
    }

    
    async function logout() {
        try {
            window.localStorage.removeItem("user")
            setUser(null)
            nav("/login")
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const auth = async () => {
            setLoading(true)
            try {
                const tempUser = window.localStorage.getItem("user")
                if (tempUser == null) throw new AuthError("User not found")
                setUser(JSON.parse(tempUser))
            } catch (err) {
                console.error(err);
                let callNav = ""
                if (loc.pathname != "/login") {
                    if (loc.pathname != "/") {
                        callNav = "?" + new URLSearchParams({ cb: loc.pathname })
                    }
                    nav("/login" + callNav)
                }
            } finally {
                setLoading(false)
            }
        }

        auth();

    }, [])

    useEffect(() => {
         // Loading function to load data or
        // fake it using setTimeout;
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 2000)
        return () => {
            clearTimeout(timeout)
        }
    }, [isLoading])

    const defaultValue = {
        user,
        isLoading,
        login,
        logout,
        setLoading
    }

    return (
        <AuthContext.Provider value={defaultValue}>
            {children}
        </AuthContext.Provider>
    )
}