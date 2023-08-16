import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
    HomestayInfo, IService, ManagerInfo, IBookingService,
    TokenPair, UserDetail, IPricingConfig, ReserveBookingInfo, 
    BookingPeriod, BookingInfo, HomestayAnalytics, MonthlyRating
} from '$lib/types/types'
import { get } from 'svelte/store';
import { authHeader, noAuthHeader, tokens, uploadAvatarHeader } from './headers';
import { FieldsError, UnauthorizedError, NotFoundError, SimpleError } from './exception';
import { extractUrl, formatDateForBooking } from '$lib/types/utils';
import { apiCalling } from '$lib/stores/stores';

const BACKEND_BASE_URL = 'http://127.0.0.1:8000'
export const BACKEND_MEDIA_URL = 'http://localhost:8000/media'
const TOKEN_API = `${BACKEND_BASE_URL}/api/token/`
// const TOKEN_REFRESH_API = `${BACKEND_BASE_URL}/api/token/refresh/`
const USER_API = `${BACKEND_BASE_URL}/api/users/`
const HOMESTAY_API = `${BACKEND_BASE_URL}/api/homestays/`
const MANAGER_PROFILE_API = `${USER_API}manager_profile/`
const BOOKING_API = `${BACKEND_BASE_URL}/api/bookings/`


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

    async userRegister(username: string, password: string): Promise<void> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.post(USER_API, {
            username: username,
            password: password
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
            response = await axios.post(TOKEN_API, {
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

        const userDetail: UserDetail = {
            id: response.data.id,
            username: response.data.username,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            phone_number: response.data.phone_number,
            avatar: response.data.avatar,
            city: response.data.city,
            district: response.data.district,
            email: response.data.email,
            street_name: response.data.street_name,
            street_number: response.data.street_number,
            is_manager: response.data.is_staff,
        };
        return userDetail;
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

        const newUserDetail: UserDetail = {
            id: response.data.id,
            username: response.data.username,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            phone_number: response.data.phone_number,
            avatar: response.data.avatar,
            city: response.data.city,
            district: response.data.district,
            email: response.data.email,
            street_name: response.data.street_name,
            street_number: response.data.street_number,
            is_manager: response.data.is_staff
        };
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
            manager_id: response.data.manager_id,
            description: response.data.description,
            address: response.data.district + ", " + response.data.city,
            price: response.data.price,
            max_num_adults: response.data.max_num_adults,
            max_num_children: response.data.max_num_children,
            image: extractUrl(response.data.image),
            pricing_config_id: response.data.pricing_config as IPricingConfig,
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

    async getAllHomestayInfo(): Promise<HomestayInfo[]> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${HOMESTAY_API}`,
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
    
        const data = response.data as Array<Record<string, string | number>>;
        const homestays: HomestayInfo[] = data.map((homestayRecord: Record<string, string | number>) => {
            const homestay: HomestayInfo = {
                id: homestayRecord.id as string,
                manager_id: homestayRecord.manager_id as string,
                name: homestayRecord.name as string,
                description: homestayRecord.description as string,
                address: homestayRecord.district + ", " + homestayRecord.city,
                price: homestayRecord.price as number,
                max_num_adults: homestayRecord.max_num_adults as number,
                max_num_children: homestayRecord.max_num_children as number,
                image: extractUrl(homestayRecord.image as string),
                pricing_config_id: response.data.pricing_config as IPricingConfig
            }
            return homestay;
        });

        return homestays;
    }

    async getAllHomestayInfoByCondition(searchParams: URLSearchParams): Promise<HomestayInfo[]> {
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
    
        const data = response.data as Array<Record<string, string | number>>;
        const homestays: HomestayInfo[] = data.map((homestayRecord: Record<string, string | number>) => {
            const homestay: HomestayInfo = {
                id: homestayRecord.id as string,
                manager_id: homestayRecord.manager_id as string,
                name: homestayRecord.name as string,
                description: homestayRecord.description as string,
                address: homestayRecord.district + ", " + homestayRecord.city,
                price: homestayRecord.price as number,
                max_num_adults: homestayRecord.max_num_adults as number,
                max_num_children: homestayRecord.max_num_children as number,
                image: extractUrl(homestayRecord.image as string),
                pricing_config_id: response.data.pricing_config as IPricingConfig
            }
            return homestay;
        });

        return homestays;
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
            name: response.data.first_name + " " + response.data.last_name,
            avatarLink: extractUrl(response.data.avatar),
            numHomestays: response.data.number_of_homestays
        }
        return managerInfo;
    }

    async getAllHomestaysOwned(managerID: string): Promise<HomestayInfo[]> {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.get(`${HOMESTAY_API}`,
            {
                ...get(noAuthHeader),
                params: {manager: managerID}
            }
            );
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Something went wrong")
            }  
        } finally {
            apiCalling.set(false)
        }
        console.log(response.data.data);
    
        const data = response.data.data as Array<Record<string, string | number| boolean>>;
        const homestays: HomestayInfo[] = data.map((homestayRecord: Record<string, string | number | boolean>) => {
            const homestay: HomestayInfo = {
                id: homestayRecord.id as string,
                manager_id: homestayRecord.manager_id as string,
                name: homestayRecord.name as string,
                description: homestayRecord.description as string,
                // address: homestayRecord.district + ", " + homestayRecord.city,
                price: homestayRecord.price as number,
                max_num_adults: homestayRecord.max_num_adults as number,
                max_num_children: homestayRecord.max_num_children as number,
                image: extractUrl(homestayRecord.image as string),
                pricing_config_id: homestayRecord.pricing_config_id as number,
                availability: homestayRecord.availability as boolean,
                allow_pet: homestayRecord.allow_pet as boolean,
                city: homestayRecord.city as string,
                avg_rating: homestayRecord.avg_rating as number,
                district: homestayRecord.district as string,
                street_name: homestayRecord.street_name as string,
                street_number: homestayRecord.street_number as string
            }
            return homestay;
        });

        return homestays;
    }

    async getAnalytics(managerName: string): Promise<HomestayAnalytics[]> {
        let response: AxiosResponse;
        apiCalling.set(true);
      
        try {
          response = await axios.get(`${BOOKING_API}${managerName}/analytics/`, get(authHeader));
        } catch (err) {
          if (err instanceof AxiosError) {
            response = err.response as AxiosResponse;
          } else {
            throw Error("Something went wrong");
          }
        } finally {
          apiCalling.set(false);
        }

        const data = response.data;
        const homestayAnalyticsList: HomestayAnalytics[] = data.map((entry: any) => {
            const monthlyRatings: MonthlyRating[] = Object.entries(entry.months).map(([date, values]: [string, any]) => ({
                date,
                num_bookings: values.bookings,
                num_rated_bookings: values.total_rated_bookings,
                avg_rating: parseFloat(values.average_rating),
                total_price: values.total_price
            }));
    
            return {
                homestay_id: entry.homestay_id,
                homestay_name: entry.homestay_name,
                ratings: monthlyRatings,
            };
        });
    
        return homestayAnalyticsList;
    }
    
    async updateHomestayDetail(homestayID: string, homestayDetail: HomestayInfo) {
        let response: AxiosResponse
        apiCalling.set(true)
        try {
            response = await axios.put(
                `${HOMESTAY_API}${homestayID}/`,
                homestayDetail,
                get(authHeader)
            );
        } catch (err) {
            if (err instanceof AxiosError){
                response = err.response as AxiosResponse
            } else {
                throw Error("Something went wrong")
            }  
        } finally {
            apiCalling.set(false)
        }
        console.log(response.data);
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

    async updateBookingStatus(username: string, bookingID: number, status: string): Promise<void> {
        let response: AxiosResponse;
        apiCalling.set(true);
        try {
            response = await axios.put(`${BOOKING_API}${username}/${bookingID}/`,
                {
                    status
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

export const authAPI = new AuthAPI();
export const userAPI = new UserAPI();
export const homestayAPI = new HomestayAPI();
export const managerAPI = new ManagerAPI();
export const serviceAPI = new ServiceAPI();
export const bookingAPI = new BookingAPI();

