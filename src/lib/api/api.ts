import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type {
    HomestayInfo, IService, ManagerInfo, IBookingService,
    TokenPair, UserDetail, IPricingConfig, ReserveBookingInfo, 
    BookingPeriod, BookingInfo, IServiceType, ICreateHomestay, PricingConfig
} from '$lib/types/types'
import { get } from 'svelte/store';
import { authHeader, noAuthHeader, uploadAvatarHeader } from './headers';
import { FieldsError, UnauthorizedError, NotFoundError, SimpleError, NetworkError } from './exception';
import { extractUrl, formatDateForBooking } from '$lib/types/utils';
import { apiCalling } from '$lib/stores/stores';
import type { IHomestayPage } from '$lib/types/types';

const BACKEND_BASE_URL = 'http://127.0.0.1:8000'
export const BACKEND_MEDIA_URL = 'http://localhost:8000/media'
const TOKEN_API = `${BACKEND_BASE_URL}/api/token/`
const TOKEN_REFRESH_API = `${BACKEND_BASE_URL}/api/token/refresh/`
const USER_API = `${BACKEND_BASE_URL}/api/users/`
const MANAGER_API = `${BACKEND_BASE_URL}/api/managers/`
const HOMESTAY_API = `${BACKEND_BASE_URL}/api/homestays/`
const MANAGER_PROFILE_API = `${USER_API}manager_profile/`
const BOOKING_API = `${BACKEND_BASE_URL}/api/bookings/`
const PRICE_CONFIG_API = `${BACKEND_BASE_URL}/api/pricing_configs/`
const SERVICE_TYPES_API = `${BACKEND_BASE_URL}/api/service_types/`


class AuthAPI {

    async userLogin(username: string, password: string): Promise<TokenPair> {
        let response: AxiosResponse
        apiCalling.set(true)
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
        } finally {
            apiCalling.set(false)
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
        apiCalling.set(false)
        return tokens;
    }

    async userRegister(username: string, password: string, is_staff: boolean): Promise<void> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.post(USER_API, {
            username: username,
            password: password,
            is_staff: is_staff,
            }, get(noAuthHeader));
        } catch (err) {
            apiCalling.set(false)
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }

        if (response.status == 400){
            console.log(response.data);
            const fieldsError = response.data as object
            throw new FieldsError("Bad Request", fieldsError)
        }
        apiCalling.set(false)
    }

    async refreshToken(refreshToken: string): Promise<TokenPair>{
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.post(TOKEN_REFRESH_API, {
                "refresh": refreshToken
            }, get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
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

    async getAllUsers(query: string): Promise<UserDetail[]> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${USER_API}?query=${query}`, get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }

        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired")
        }

        const userDetails: UserDetail[] = response.data as UserDetail[]
        return userDetails;
    }

    async getAllManagers(query: string): Promise<UserDetail[]> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${MANAGER_API}?query=${query}`, get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }

        if (response.status == 401){
            throw new UnauthorizedError("Token is invalid or expired")
        }

        const userDetails: UserDetail[] = response.data as UserDetail[]
        return userDetails;
    }

    async getUserDetail(username: string): Promise<UserDetail> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${USER_API}${username}/`, get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }
        

        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired")
        }

        if (response.status == 404){
            console.log(response.data);
            throw new NotFoundError("User not found")
        }

        const userDetail: UserDetail = response.data as UserDetail
        return userDetail;
    }

    async getManagerInfo(managerID: string): Promise<ManagerInfo> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${MANAGER_PROFILE_API}${managerID}/`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }

        const managerInfo: ManagerInfo = {
            id: response.data.id,
            name: response.data.first_name + " " + response.data.last_name,
            username: response.data.username,
            avatarLink: extractUrl(response.data.avatar),
            numHomestays: response.data.number_of_homestays
        }
        return managerInfo;
    }

    async updateUserDetail(username: string, userDetail: UserDetail){
        let response: AxiosResponse
        apiCalling.set(true)
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
        } finally {
            apiCalling.set(false)
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

        const newUserDetail: UserDetail = response.data as UserDetail
        return newUserDetail;
    }

    async updatePassword(username: string, password: string, newPassword: string): Promise<void>{
        let response: AxiosResponse
        apiCalling.set(true)
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
        } finally {
            apiCalling.set(false)
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
        apiCalling.set(true)
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
        } finally {
            apiCalling.set(false)
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

    async deteleUser(username: string): Promise<void> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.delete(`${USER_API}${username}/`, get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }
        
        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("User not found or token expired")
        }
    }
}

class HomestayAPI {
    async getHomestayInfo(homestayID: string): Promise<HomestayInfo> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${HOMESTAY_API}${homestayID}/`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }
        const homestayInfo: HomestayInfo = {
            id: response.data.id,
            name: response.data.name,
            managerID: response.data.manager_id,
            description: response.data.description,
            district: response.data.district,
            city: response.data.city,
            street_number: response.data.street_number,
            street_name: response.data.street_name,
            allow_pet: response.data.allow_pet,
            availability: response.data.availability,
            address: response.data.district + ", " + response.data.city,
            price: response.data.price,
            max_num_adults: response.data.max_num_adults,
            max_num_children: response.data.max_num_children,
            imageLink: extractUrl(response.data.image),
            pricing_config: response.data.pricing_config as IPricingConfig,
            avg_rating: response.data.avg_rating,
            reviews: response.data.reviews.map((review: any) => {
                return {
                    username: `${review.user.first_name} ${review.user.last_name}`,
                    stars: review.rating,
                    date: review.review_timestamp,
                    content: review.comment
                };
            }),
            numReviews: response.data.reviews.length
        };
        return homestayInfo;
    }

    async getAllHomestayInfo(page?: number): Promise<IHomestayPage> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${HOMESTAY_API}?page=${page || 0}`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }
    
        const data = response.data.data as Array<Record<string, string | number>>;
        const homestays: HomestayInfo[] = data.map((homestayRecord: Record<string, string | number>) => {
            const homestay: HomestayInfo = {
                id: homestayRecord.id as string,
                managerID: homestayRecord.manager_id as string,
                name: homestayRecord.name as string,
                description: homestayRecord.description as string,
                district: response.data.district,
                city: response.data.city,
                street_number: response.data.street_number,
                street_name: response.data.street_name,
                allow_pet: response.data.allow_pet,
                availability: response.data.availability,
                address: homestayRecord.district + ", " + homestayRecord.city,
                price: homestayRecord.price as number,
                max_num_adults: homestayRecord.max_num_adults as number,
                max_num_children: homestayRecord.max_num_children as number,
                imageLink: extractUrl(homestayRecord.image as string),
                pricing_config: response.data.pricing_config as IPricingConfig
            }
            return homestay;
        });
        const homestayPage: IHomestayPage = {
            current_page: response.data.current_page,
            max_page: response.data.max_page,
            data: homestays
        }
        return homestayPage;
    }

    async getAllHomestayInfoByCondition(searchParams: URLSearchParams): Promise<IHomestayPage> {
        let response: AxiosResponse
        apiCalling.set(true)
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
        } finally {
            apiCalling.set(false)
        }
    
        const data = response.data.data as Array<Record<string, string | number>>;
        const homestays: HomestayInfo[] = data.map((homestayRecord: Record<string, string | number>) => {
            const homestay: HomestayInfo = {
                id: homestayRecord.id as string,
                managerID: homestayRecord.manager_id as string,
                name: homestayRecord.name as string,
                description: homestayRecord.description as string,
                district: response.data.district,
                city: response.data.city,
                street_number: response.data.street_number,
                street_name: response.data.street_name,
                allow_pet: response.data.allow_pet,
                availability: response.data.availability,
                address: homestayRecord.district + ", " + homestayRecord.city,
                price: homestayRecord.price as number,
                max_num_adults: homestayRecord.max_num_adults as number,
                max_num_children: homestayRecord.max_num_children as number,
                imageLink: extractUrl(homestayRecord.image as string),
                pricing_config: response.data.pricing_config as IPricingConfig
            }
            return homestay;
        });

        const homestayPage: IHomestayPage = {
            current_page: response.data.current_page,
            max_page: response.data.max_page,
            data: homestays
        }

        return homestayPage;
    }

    async updateHomestayInfo(homestayInfo: HomestayInfo){
        let response: AxiosResponse

        const infoToSend = {
            id: homestayInfo.id,
            name: homestayInfo.name,
            price: homestayInfo.price,
            description: homestayInfo.description,
            max_num_adults: homestayInfo.max_num_adults,
            max_num_children: homestayInfo.max_num_children,
            district: homestayInfo.district,
            city: homestayInfo.city,
            manager_id: homestayInfo.managerID,
            pricing_config_id: homestayInfo.pricing_config.id,
            allow_pet: homestayInfo.allow_pet,
            availability: homestayInfo.availability,
            street_name: homestayInfo.street_name,
            street_number: homestayInfo.street_number
        }

        apiCalling.set(true)
        try {
            response = await axios.put(
                `${HOMESTAY_API}${homestayInfo.id}/`,
                infoToSend,
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
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

        if (response.status == 500){
            throw new NetworkError("Server Error")
        }

    }

    async createNewHomestay(homestayCreateInfo: ICreateHomestay){
        let response: AxiosResponse

        apiCalling.set(true)
        try {
            response = await axios.post(
                `${HOMESTAY_API}`,
                homestayCreateInfo,
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }

        if (response.status == 401){
            throw new UnauthorizedError("Token is invalid or expired")
        }

        if (response.status == 400){
            const fieldsError = response.data as object
            throw new FieldsError("Bad Request", fieldsError)
        }

        if (response.status == 500){
            throw new NetworkError("Server Error")
        }

        const homestayInfo: HomestayInfo = {
            id: response.data.id,
            name: response.data.name,
            managerID: response.data.manager_id,
            description: response.data.description,
            district: response.data.district,
            city: response.data.city,
            street_number: response.data.street_number,
            street_name: response.data.street_name,
            allow_pet: response.data.allow_pet,
            availability: response.data.availability,
            address: response.data.district + ", " + response.data.city,
            price: response.data.price,
            max_num_adults: response.data.max_num_adults,
            max_num_children: response.data.max_num_children,
            imageLink: extractUrl(response.data.image),
            pricing_config: {
                id: response.data.pricing_config_id,
                cancellation_refund_percentage: 0,
                deposit_percentage: 0,
                discount: 0,
                free_cancellation_days: 0,
                name: ""
            }
        };
        return homestayInfo;
    }

    async updateHomestayBackground(homestayID: string, image: File){
        const formData = new FormData();
        formData.append('image', image);
        apiCalling.set(true)
        let response: AxiosResponse
        try {
            response = await axios.put(
                `${HOMESTAY_API}${homestayID}/image/`,
                formData,
                get(uploadAvatarHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }
        
        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired")
        }
        if (response.status == 400){
            const fieldsError = response.data as object
            throw new FieldsError("Bad Request", fieldsError)
        }
        return extractUrl(response.data.image);
    }
}

class ManagerAPI {
    async getManagerInfo(managerID: string): Promise<ManagerInfo> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${MANAGER_PROFILE_API}${managerID}/`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }

        const managerInfo: ManagerInfo = {
            id: response.data.id,
            name: response.data.first_name + " " + response.data.last_name,
            username: response.data.username,
            avatarLink: extractUrl(response.data.avatar),
            numHomestays: response.data.number_of_homestays
        }
        return managerInfo;
    }
}

class ServiceAPI {
    async getHomestayServices(homestayID: string): Promise<IService[]> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${HOMESTAY_API}${homestayID}/services/`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }
        const homestayServices = response.data as IService[]
        return homestayServices;
    }

    async updateServiceDetail(serviceDetail: IService, homestayID: string) {
        let response: AxiosResponse

        const infoToSend = {
            price: serviceDetail.price,
            description: serviceDetail.description,
            availability: serviceDetail.availability,
            service_type_id: serviceDetail.service_type_id,
            homestay_id: homestayID
        }

        apiCalling.set(true)
        try {
            response = await axios.put(
                `${HOMESTAY_API}services/${serviceDetail.id}/`,
                infoToSend,
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
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

        if (response.status == 500){
            throw new NetworkError("Server Error")
        }
    }

    async addNewService(serviceDetail: IService, homestayID: string){
        let response: AxiosResponse

        const infoToSend = {
            price: serviceDetail.price,
            description: serviceDetail.description,
            availability: serviceDetail.availability,
            service_type_id: serviceDetail.service_type_id,
            homestay_id: homestayID
        }

        apiCalling.set(true)
        try {
            response = await axios.post(
                `${HOMESTAY_API}${homestayID}/services/`,
                infoToSend,
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
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

        if (response.status == 500){
            throw new NetworkError("Server Error")
        }

        const newService: IService = response.data as IService
        return newService
    }
}

class BookingAPI{
    async reserveHomestay(homestayID: string, 
            username: string,
            bookingInfo: ReserveBookingInfo, 
            services: IBookingService[]): Promise<void> {
        let response: AxiosResponse
        apiCalling.set(true)
        const servicesIdList = services.filter((value) => value.availability == true && value.checked)
            .map((service) => {
                return { id: service.id }
            });
        bookingInfo.checkin_date = formatDateForBooking(bookingInfo.checkin_date)
        bookingInfo.checkout_date = formatDateForBooking(bookingInfo.checkout_date)
        try {
            response = await axios.post(`${BOOKING_API}${username}/`,
                {
                    homestay: homestayID,
                    services: servicesIdList,
                    ...bookingInfo,
                },
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }

        if (response.status == 400){
            console.log(response.data);
            throw new SimpleError(response.data as string)
        }
        
        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired")
        }
    }

    async getHomestayBookedDates(homestayID: string): Promise<BookingPeriod[]> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${BOOKING_API}booked_dates/${homestayID}/`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }

        const bookingPeriods = response.data as BookingPeriod[];
        return bookingPeriods;
    }

    async getBookingHistory(username: string): Promise<BookingInfo[]> {
        let response: AxiosResponse;
        apiCalling.set(true);
        try {
            response = await axios.get(`${BOOKING_API}${username}/`,
                get(authHeader));
            const data = response.data;
            const bookingInfoList: BookingInfo[] = data.map((booking: any) => {
                return {
                    id: booking.id,
                    checkin_date: booking.checkin_date,
                    checkout_date: booking.checkout_date,
                    status: booking.status,
                    total_price: booking.total_price,
                    comment: booking.comment,
                    rating: booking.rating
                };
            });
            return bookingInfoList;
        } catch (err) {
            if (err instanceof AxiosError) {
                response = err.response as AxiosResponse;
                console.log(response.data.detail);
            } else {
                throw new Error("Something went wrong");
            }
            return [];
        } finally {
            apiCalling.set(false)
        }
    }

    async cancelBooking(username: string, bookingID: number): Promise<void> {
        let response: AxiosResponse;
        apiCalling.set(true);
        try {
            response = await axios.put(`${BOOKING_API}${username}/${bookingID}/`,
                {
                    status: "cancelled"
                },
                get(authHeader)
            );
            console.log(response.status);
        } catch (err) {
            if (err instanceof AxiosError) {
                response = err.response as AxiosResponse;
                console.log(response.data.detail);
            } else {
                throw new Error("Something went wrong");
            }
        } finally {
            apiCalling.set(false)
        }
    }

    async reviewBooking(username: string, 
                        bookingID: number,
                        comment: string,
                        rating: number): Promise<void> {
        let response: AxiosResponse;
        apiCalling.set(true);
        try {
            response = await axios.put(`${BOOKING_API}${username}/${bookingID}/`,
                {
                    comment,
                    rating
                },
                get(authHeader)
            );
            console.log(response.status);
        } catch (err) {
            if (err instanceof AxiosError) {
                response = err.response as AxiosResponse;
                console.log(response.data.detail);
            } else {
                throw new Error("Something went wrong");
            }
        } finally {
            apiCalling.set(false)
        }
    }
}

class PriceConfigAPI{
    
    async getAllPriceConfig(): Promise<IPricingConfig[]> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${PRICE_CONFIG_API}`,
                get(noAuthHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }
        
        const allPriceConfigs = response.data as  IPricingConfig[]
        return allPriceConfigs;
    }

    async createPricingConfig(pricingConfig: IPricingConfig){
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.post(`${PRICE_CONFIG_API}`,
                pricingConfig,
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
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

        if (response.status == 500){
            throw new NetworkError("Server Error")
        }

        const newPricingConfig: IPricingConfig = response.data as IPricingConfig
        return newPricingConfig
    }

    async updatePricingConfig(pricingConfig: IPricingConfig){
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.put(`${PRICE_CONFIG_API}${pricingConfig.id}/`,
                pricingConfig,
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
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

        if (response.status == 500){
            throw new NetworkError("Server Error")
        }

        const newPricingConfig: IPricingConfig = response.data as IPricingConfig
        return newPricingConfig
    }
}

class AdminAPI{
    
    async getAllServiceTypes(): Promise<IServiceType[]> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${SERVICE_TYPES_API}`,
                get(authHeader));
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Nothing")
            }  
        } finally {
            apiCalling.set(false)
        }

        if (response.status == 400){
            console.log(response.data);
            throw new SimpleError(response.data as string)
        }
        
        if (response.status == 401){
            console.log(response.data);
            throw new UnauthorizedError("Token is invalid or expired or not allowed")
        }
        
        const allServiceTypes = response.data as  IServiceType[]
        return allServiceTypes;
    }
}

export const authAPI = new AuthAPI();
export const userAPI = new UserAPI();
export const homestayAPI = new HomestayAPI();
export const managerAPI = new ManagerAPI();
export const serviceAPI = new ServiceAPI();
export const bookingAPI = new BookingAPI();
export const priceConfigAPI = new PriceConfigAPI();
export const adminAPI = new AdminAPI();

