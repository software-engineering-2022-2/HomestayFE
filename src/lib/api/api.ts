import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type {HomestayInfo, ManagerInfo, TokenPair, UserDetail} from '$lib/types/types'
import { get } from 'svelte/store';
import { authHeader, noAuthHeader, uploadAvatarHeader } from './headers';
import { FieldsError, UnauthorizedError, NotFoundError } from './exception';
import { extractUrl } from '$lib/types/utils';


const BACKEND_BASE_URL = 'http://127.0.0.1:8000'
export const BACKEND_MEDIA_URL = 'http://localhost:8000/media'
const TOKEN_API = `${BACKEND_BASE_URL}/api/token/`
// const TOKEN_REFRESH_API = `${BACKEND_BASE_URL}/api/token/refresh/`
const USER_API = `${BACKEND_BASE_URL}/api/users/`
const HOMESTAY_API = `${BACKEND_BASE_URL}/api/homestays/`
const MANAGER_PROFILE_API = `${USER_API}manager_profile/`


class AuthAPI {

    async userLogin(username: string, password: string): Promise<TokenPair> {
        let response: AxiosResponse
        try {
            response = await axios.post(TOKEN_API, {
                username: username,
                password: password
            }, get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }
        console.log(response)
        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Wrong username or password")
        }

        const tokens: TokenPair = {
            token: response.data.access,
            refreshToken: response.data.refresh
        };
        return tokens;
    }

    async userRegister(username: string, password: string): Promise<void> {
        let response: AxiosResponse
        try {
            response = await axios.post(USER_API, {
            username: username,
            password: password
            }, get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }
        console.log(response)

        if (response.status == 400){
            console.log(response.data);
            const fieldsError = response.data as object
            throw new FieldsError("Bad Request", fieldsError)
        }
    }

    async refreshToken(refreshToken: string): Promise<TokenPair>{
        let response: AxiosResponse
        try {
            response = await axios.post(TOKEN_API, {
                "refresh": refreshToken
            }, get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }

        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired")
        }
        const tokens: TokenPair = {
            token: response.data.access,
            refreshToken: refreshToken
        };
        return tokens;
    }
    
}

class UserAPI {

    async getUserDetail(username: string): Promise<UserDetail> {
        let response: AxiosResponse
        try {
            response = await axios.get(`${USER_API}${username}/`, get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }
        

        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired")
        }

        if (response.status == 404){
            console.log(response.data);
            throw new NotFoundError("User not found")
        }

        const userDetail: UserDetail = {
            username: response.data.username,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            phone_number: response.data.phone_number,
            avatar: response.data.avatar,
            city: response.data.city,
            district: response.data.district,
            email: response.data.email,
            street_name: response.data.street_name,
            street_number: response.data.street_number
        };
        return userDetail;
    }

    async updateUserDetail(username: string, userDetail: UserDetail){
        let response: AxiosResponse
        try {
            response = await axios.put(
                `${USER_API}${username}/`,
                userDetail,
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }

        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired")
        }

        if (response.status == 400){
            console.log(response.data);
            const fieldsError = response.data as object
            throw new FieldsError("Bad Request", fieldsError)
        }

        const newUserDetail: UserDetail = {
            username: response.data.username,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            phone_number: response.data.phone_number,
            avatar: response.data.avatar,
            city: response.data.city,
            district: response.data.district,
            email: response.data.email,
            street_name: response.data.street_name,
            street_number: response.data.street_number
        };
        return newUserDetail;
    }

    async updatePassword(username: string, password: string, newPassword: string): Promise<void>{
        let response: AxiosResponse
        try {
            response = await axios.put(
                `${USER_API}${username}/password/`,
                {
                    username: username,
                    password: password,
                    new_password: newPassword
                },
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }
        
        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired")
        }
        if (response.status == 400){
            console.log(response.data);
            const fieldsError = response.data as object
            throw new FieldsError("Bad Request", fieldsError)
        }
    }

    async updateAvatar(username: string, image: File): Promise<string>{
        const formData = new FormData();
        formData.append('image', image);
        let response: AxiosResponse
        try {
            response = await axios.put(
                `${USER_API}${username}/avatar/`,
                formData,
                get(uploadAvatarHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }
        
        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired")
        }
        if (response.status == 400){
            console.log(response.data);
            const fieldsError = response.data as object
            throw new FieldsError("Bad Request", fieldsError)
        }
        return response.data.avatar;
    }
}

class HomestayAPI {
    async getHomestayInfo(homestayID: string): Promise<HomestayInfo> {
        let response: AxiosResponse
        try {
            response = await axios.get(`${HOMESTAY_API}${homestayID}/`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }
    
        const homestayInfo: HomestayInfo = {
            name: response.data.name,
            managerID: response.data.manager_id,
            description: response.data.description,
            address: response.data.district + ", " + response.data.city,
            price: response.data.price,
            imageLink: extractUrl(response.data.image)
        }
        return homestayInfo;
    }

    async getAllHomestayInfo(): Promise<HomestayInfo[]> {
        let response: AxiosResponse
        try {
            response = await axios.get(`${HOMESTAY_API}`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }
    
        const data = response.data as Array<Record<string, string | number>>;
        const homestays: HomestayInfo[] = data.map((homestayRecord: Record<string, string | number>) => {
            const homestay: HomestayInfo = {
                id: homestayRecord.id as string,
                managerID: homestayRecord.manager_id as string,
                name: homestayRecord.name as string,
                description: homestayRecord.description as string,
                address: homestayRecord.district + ", " + homestayRecord.city,
                price: homestayRecord.price as number,
                imageLink: extractUrl(homestayRecord.image as string)
            }
            return homestay;
        });

        return homestays;
    }

    async getAllHomestayInfoByCondition(searchParams: URLSearchParams): Promise<HomestayInfo[]> {
        let response: AxiosResponse
        try {
            response = await axios.get(`${HOMESTAY_API}`,
            {
                ...get(noAuthHeader),
                params: searchParams
            }
            );
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }
    
        const data = response.data as Array<Record<string, string | number>>;
        const homestays: HomestayInfo[] = data.map((homestayRecord: Record<string, string | number>) => {
            const homestay: HomestayInfo = {
                id: homestayRecord.id as string,
                managerID: homestayRecord.manager_id as string,
                name: homestayRecord.name as string,
                description: homestayRecord.description as string,
                address: homestayRecord.district + ", " + homestayRecord.city,
                price: homestayRecord.price as number,
                imageLink: extractUrl(homestayRecord.image as string)
            }
            return homestay;
        });

        return homestays;
    }
}

class ManagerAPI {
    async getManagerInfo(managerID: string): Promise<ManagerInfo> {
        let response: AxiosResponse
        try {
            response = await axios.get(`${MANAGER_PROFILE_API}${managerID}/`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        }

        const managerInfo: ManagerInfo = {
            name: response.data.first_name + " " + response.data.last_name,
            avatarLink: extractUrl(response.data.avatar),
            numHomestays: response.data.number_of_homestays
        }
        return managerInfo;
    }
}

export const authAPI = new AuthAPI();
export const userAPI = new UserAPI();
export const homestayAPI = new HomestayAPI();
export const managerAPI = new ManagerAPI();

