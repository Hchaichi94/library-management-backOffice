
import axiosInstance from '../utils/axiosInstance'

export async function createcategory(data: any) {

    try {
        const res = await axiosInstance(`/category`, {
            method: "POST",
            data,
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function getListcategorys() {
    try {
        const res = await axiosInstance(`/category/all`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function deletecategory(id: string) {
    try {
        const res = await axiosInstance(`/category/${id}`, {
            method: "DELETE",
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function getcategoryById(id: string) {
    try {
        const res = await axiosInstance(`/category/${id}`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}

export async function updatecategoryById(data: any, id: string) {
    try {
        const res = await axiosInstance(`/category/${id}`, {
            method: "PUT",
            data
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}