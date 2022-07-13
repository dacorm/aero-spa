import {AppDispatch} from "../index";
import axios from "../../axios/index";
import {authSlice} from "../slices/authSlice";


interface AuthResponse {
    access: string
    refresh: string
}

interface AuthData {
    username: string
    password: string
}

export const register = (data: AuthData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.post<AuthResponse>('/auth/register', data)
            dispatch(authSlice.actions.login({
                username: data.username,
                access: res.data.access
            }))
        } catch (e) {
            console.log(e)
        }
    }
}

export const login = (data: AuthData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.post<AuthResponse>('/auth/login', data)
            dispatch(authSlice.actions.login({
                username: data.username,
                access: res.data.access
            }))
        } catch (e) {
            console.log(e)
        }
    }
}