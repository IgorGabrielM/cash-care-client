import {api} from "../pages/api/api";
import {setCookie} from "nookies";
import {Router} from "next/router";
import {createContext, useState} from "react";
import {UserModel} from "../data/models/UserModel";

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserModel;
    signIn: (data: UserModel) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ ...children }) {
    const [user, setUser] = useState<UserModel>({id: '', username: '', password: ''})
    const isAuthenticated = !!user;

    async function signIn({username, password}: UserModel) {
        const data = await api.post("auth/login", {username, password})
        console.log(data.data.token)
        setCookie(undefined, 'nextauth.token', data.data.token, {maxAge: 60 * 60 * 12}) //12 hours
        api.defaults.headers['Authorization'] = `Bearer ${data}`
        setUser(user)
        // @ts-ignore
        Router.push('/menu/home')
    }

    return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
        {children}
    </AuthContext.Provider>
    )
}