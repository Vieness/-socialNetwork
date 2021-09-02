/*
axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,{
    withCredentials:true
})*/
import {instance} from "./api";

type GetCaptchaUrlResponseType ={
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(res=>res.data)
    },

}