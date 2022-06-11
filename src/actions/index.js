import axios from 'axios';
import { BASE_URL } from '../config/const';
axios.defaults.baseURL = BASE_URL;

export const request = async (method, endPoint, data,headers) => {
    try {
        const res = await axios({
            method: method,
            url: endPoint,
            ...(data && { data }),
            ...(headers && {headers})
        })
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }

}
