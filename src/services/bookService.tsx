
import axiosInstance from '../utils/axiosInstance'

export async function createBook(data: any) {

    try {
        const res = await axiosInstance(`/book`, {
            method: "POST",
            data,
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function getListBooks() {
    try {
        const res = await axiosInstance(`/book/all`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function deleteBook(id: string) {
    try {
        const res = await axiosInstance(`/book/${id}`, {
            method: "DELETE",
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function getBookById(id: string) {
    try {
        const res = await axiosInstance(`/book/${id}`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function updateBookById(data: any, id: string) {
    try {
        const res = await axiosInstance(`/book/${id}`, {
            method: "PUT",
            data
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}