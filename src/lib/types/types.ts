enum StarType{
    FULL = 'full',
    HALF = 'half',
    NONE = 'none'
}

interface HomestayInfo {
    id: string
    managerID: string
    name: string
    description: string
    stars?: number
    numReviews?: number
    address: string
    price: number
    imageLink: string
}

interface ManagerInfo {
    name: string
    avatarLink: string
    numHomestays: number
}

interface IServiceType {
    id: number,
    name: string
}

interface IService {
    id: number,
    price: number,
    description: string,
    availability: boolean,
    service_type_id: number,
    service_type: IServiceType
}

interface PricingConfig {
    depositPercentage: number,
    freeCancelationDays: number,
    cancelationRefund: number
}

interface Review {
    username: string,
    stars: number,
    date: string,
    content: string
}

interface TokenPair{
    token: string,
    refreshToken: string
}

export interface UserDetail{
    username: string,
    first_name: string,
    last_name: string,
    phone_number?: string,
    street_name?: string,
    street_number?: string,
    district?: string,
    city?: string,
    avatar?: string,
    email?: string,
}

export {StarType, 
    type HomestayInfo, 
    type ManagerInfo,
    type PricingConfig, 
    type Review, 
    type TokenPair,
    type IService,
    type IServiceType};