import axios from "axios";
import {UserType} from "../types/types";


export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "87c337dd-8441-4e00-8663-12c3263f4cef"
    }
})

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodesWithCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}