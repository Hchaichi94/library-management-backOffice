import axiosInstance from '../utils/axiosInstance'

export async function getAccount() {
    try {
        const res = await axiosInstance(`/user/account`, {
            method: "GET",
        })
        return { data: res.data }

    } catch (err: any) {
        return { error: err.response }
    }

}

