import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {TokenPair} from '$lib/types/types'
import { get } from 'svelte/store';
import { authHeader, noAuthHeader } from './headers';


const BACKEND_BASE_URL = 'http://localhost:8000'
const TOKEN_API = `${BACKEND_BASE_URL}/api/token/`
// const TOKEN_REFRESH_API = `${BACKEND_BASE_URL}/api/token/refresh/`
// const USER_API = `${BACKEND_BASE_URL}/api/users/`


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
    
}

export const authApi = new AuthAPI();

