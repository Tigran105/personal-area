import axios from "axios";


interface IConfig {
    method: string,
    url: string,
    headers: any,
    data?: object,
}



const BASE_URL: string | undefined = process.env.REACT_APP_BASE_URL

export const fetchingWithAxiosMiddleware = async (method: string, url: string, data?: object) => {
    const config: IConfig = {
        method,
        url: `${BASE_URL}${url}`,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const token = localStorage.getItem("access_token")
    if (token) {
        config.headers['x-access-token'] = token
    }
    if (method !== 'GET') {
        config.data = data;
    }
    return axios(config);
}