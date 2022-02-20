
import axiosInstance from '../utils/axiosInstance'

export async function createAuther(data: any) {

    try {
        const res = await axiosInstance(`/auther`, {
            method: "POST",
            data,
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function getListAuthers() {
    try {
        const res = await axiosInstance(`/auther/all`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function deleteAuther(id: string) {
    try {
        const res = await axiosInstance(`/auther/${id}`, {
            method: "DELETE",
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function getAutherById(id: string) {
    try {
        const res = await axiosInstance(`/auther/${id}`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function updateAutherById(data: any, id: string) {
    try {
        console.log('data', data)
        const res = await axiosInstance(`/auther/${id}`, {
            method: "PUT",
            data
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}