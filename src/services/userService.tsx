
import axiosInstance from '../utils/axiosInstance'

export async function createUser(data: any) {

    try {
        const res = await axiosInstance(`/user`, {
            method: "POST",
            data,
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function getListUsers() {
    try {
        const res = await axiosInstance(`/user/all`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function deleteUser(id: string) {
    try {
        const res = await axiosInstance(`/user/${id}`, {
            method: "DELETE",
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function getUserById(id: string) {
    try {
        const res = await axiosInstance(`/user/${id}`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function updateUserById(data: any, id: string) {
    try {
        const res = await axiosInstance(`/user/${id}`, {
            method: "PUT",
            data
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}