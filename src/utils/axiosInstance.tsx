import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode"

const { REACT_APP_ENDPOINT } = process.env
let authToken = localStorage.getItem('token') ? localStorage.getItem("token") : null

const axiosInstance = axios.create({
    baseURL: REACT_APP_ENDPOINT,
    headers: {
        'jwt-token': `${authToken}`,
    },
})


axiosInstance.interceptors.request.use(async (req: any) => {
    authToken = localStorage.getItem('token') ? localStorage.getItem("token") : null
    req.headers['jwt-token'] = `${authToken}`

    if (authToken) {
        const user: any = jwt_decode(authToken)
      
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req

    
        localStorage.removeItem('token')
        window.location.pathname = '/'

    }

    return req
})

export default axiosInstance
