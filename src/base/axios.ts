import axios from "axios";
import {appConfig} from "../appConfig";

export const api = axios.create({
    baseURL: appConfig.BASE_URL,
})

axios.interceptors.response.use(
    async (response) => {
        return response;
    },
);