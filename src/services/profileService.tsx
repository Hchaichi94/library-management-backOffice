import axiosInstance from '../utils/axiosInstance'

export async function getProfile() {

    try {
        const res = await axiosInstance(`/admin/getAdminInfo`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}
export async function updateProfile(data: { username: string, password: string | undefined }, id: string) {

    try {
        const res = await axiosInstance(`/admin/updateAdmin/${id}`, {
            method: "PATCH",
            data
        })
        return { status: res.status }

    } catch (err: any) {
        return { error: err.response }
    }

}