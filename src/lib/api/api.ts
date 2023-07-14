import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {HomestayInfo, TokenPair, UserDetail} from '$lib/types/types'
import { get } from 'svelte/store';
import { authHeader, noAuthHeader, uploadAvatarHeader } from './headers';


const BACKEND_BASE_URL = 'http://localhost:8000'
export const BACKEND_MEDIA_URL = 'http://localhost:8000/media'
const TOKEN_API = `${BACKEND_BASE_URL}/api/token/`
// const TOKEN_REFRESH_API = `${BACKEND_BASE_URL}/api/token/refresh/`
const USER_API = `${BACKEND_BASE_URL}/api/users/`
const HOMESTAY_API = `${BACKEND_BASE_URL}/api/homestays/`


class AuthAPI {

    async userLogin(username: string, password: string): Promise<TokenPair | null> {
        try {
            const response: AxiosResponse = await axios.post(TOKEN_API, {
            username: username,
            password: password
            }, get(noAuthHeader));

            if (response.status != 200){
                console.log(response.data);
                return null;
            }

            const tokens: TokenPair = {
                token: response.data.access,
                refreshToken: response.data.refresh
            };
            return tokens;
      
        } catch (err) {
            console.log(err);
            return null; 
        }
    }

    async userRegister(username: string, password: string): Promise<boolean> {
        try {
            const response: AxiosResponse = await axios.post(TOKEN_API, {
            username: username,
            password: password
            }, get(noAuthHeader));

            if (response.status != 201){
                console.log(response.data);
                return false;
            }
            return true;
        } catch (err) {
            console.log(err);
            return false; 
        }
    }

    async refreshToken(refreshToken: string){
        try {
            const response: AxiosResponse = await axios.post(TOKEN_API, {
                "refresh": refreshToken
            }, get(noAuthHeader));
            if (response.status != 200){
                console.log(response.data);
                return null;
            }
            const tokens: TokenPair = {
                token: response.data.access,
                refreshToken: refreshToken
            };
            return tokens;
      
        } catch (err) {
            console.log(err);
            return null; 
        }
    }

    
}

class UserAPI {

    async getUserDetail(username: string): Promise<UserDetail | null> {
        try {
            const response: AxiosResponse = await axios.get(`${USER_API}${username}/`, get(authHeader));

            if (response.status != 200){
                console.log(response.data);
                return null;
            }

            const userDetail: UserDetail = {
                username: response.data.username,
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                phoneNumber: response.data.phone_number,
                avatar: response.data.avatar,
                city: response.data.city,
                district: response.data.district,
                email: response.data.email,
                streetName: response.data.street_name,
                streetNumber: response.data.street_number
            };
            return userDetail;
        } catch (err) {
            console.log(err);
            return null; 
        }
    }

    async updateUserDetail(username: string, userDetail: UserDetail){
        try {
            const response: AxiosResponse = await axios.put(
                `${USER_API}${username}/`,
                userDetail,
                get(authHeader));

            if (response.status != 200){
                console.log(response.data);
                return null;
            }

            const newUserDetail: UserDetail = {
                username: response.data.username,
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                phoneNumber: response.data.phone_number,
                avatar: response.data.avatar,
                city: response.data.city,
                district: response.data.district,
                email: response.data.email,
                streetName: response.data.street_name,
                streetNumber: response.data.street_number
            };
            return newUserDetail;
        } catch (err) {
            console.log(err);
            return null; 
        }
    }

    async updatePassword(username: string, password: string, newPassword: string): Promise<boolean>{
        try {
            const response: AxiosResponse = await axios.put(
                `${USER_API}${username}/password/`,
                {
                    username: username,
                    password: password,
                    new_password: newPassword
                },
                get(authHeader));
            if (response.status != 200){
                console.log(response.data);
                return false;
            }
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updateAvatar(username: string, image: File): Promise<string | null>{
        try {
            const formData = new FormData();
            formData.append('image', image);
            const response: AxiosResponse = await axios.put(
                `${USER_API}${username}/avatar/`,
                formData,
                get(uploadAvatarHeader));
            if (response.status != 200){
                console.log(response.data);
                return null;
            }
            return response.data.avatar;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

class HomestayAPI {
    async getHomestayInfo(homestayID: string): Promise<HomestayInfo | null> {
        try {
            const response: AxiosResponse =
                await axios.get(`${HOMESTAY_API}${homestayID}/`,
                get(noAuthHeader));

            if (response.status != 200){
                console.log(response.data);
                return null;
            }

            const homestayInfo: HomestayInfo = {
                name: response.data.name,
                description: response.data.description,
                address: response.data.district + ", " + response.data.city,
                price: response.data.price
            }
            return homestayInfo;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAllHomestayInfo(): Promise<HomestayInfo[] | null> {
        try {
            const response: AxiosResponse =
                await axios.get(`${HOMESTAY_API}`,
                get(noAuthHeader));

            if (response.status != 200){
                console.log(response.data);
                return null;
            }

            const homestays: HomestayInfo[] = response.data.map((homestay: any) => {
                return {
                    id: homestay.id,
                    name: homestay.name,
                    description: homestay.description,
                    address: homestay.district + ", " + homestay.city,
                    price: homestay.price
                };
            });

            return homestays;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export const authAPI = new AuthAPI();
export const userAPI = new UserAPI();
export const homestayAPI = new HomestayAPI();

