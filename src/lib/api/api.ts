import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {TokenPair, UserDetail} from '$lib/types/types'
import { get } from 'svelte/store';
import { authHeader, noAuthHeader } from './headers';


const BACKEND_BASE_URL = 'http://localhost:8000'
const TOKEN_API = `${BACKEND_BASE_URL}/api/token/`
// const TOKEN_REFRESH_API = `${BACKEND_BASE_URL}/api/token/refresh/`
const USER_API = `${BACKEND_BASE_URL}/api/users/`


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
    
}

class UserAPI {

    async getUserDetail(username: string): Promise<UserDetail | null> {
        try {
            const response: AxiosResponse = await axios.get(`${USER_API}${username}`, get(authHeader));
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
}

export const authApi = new AuthAPI();
export const userApi = new UserAPI();

