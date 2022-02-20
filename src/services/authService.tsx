import axios from 'axios'
import { LoginData } from '../interfaces/LoginInterface'
import { SignUpData } from '../interfaces/SignUpInterface'
const { REACT_APP_ENDPOINT } = process.env

export async function loginUser(data: LoginData) {

    try {
        const res = await axios(`${REACT_APP_ENDPOINT}/auth/signin`, {
            method: "POST",
            data,
        })
        return { token: res.data.token }

    } catch (err: any) {
        if (err.response.status) return { error: err.response.status }
        return { error: err.response }
    }

}

export async function signup(data: SignUpData) {

    try {
        const res = await axios(`${REACT_APP_ENDPOINT}/auth/signup`, {
            method: "POST",
            data,
        })
        return { token: res.data.token }

    } catch (err: any) {
        if (err.response.status) return { error: err.response.status }
        return { error: err.response }
    }

}