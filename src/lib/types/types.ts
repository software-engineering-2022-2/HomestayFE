
enum StarType{
    FULL = 'full',
    HALF = 'half',
    NONE = 'none'
}

interface Review {
    username: string,
    stars: number,
    date: string,
    content: string
}

interface HomestayInfo {
    id: string
    managerID: string
    name: string
    description: string
    numReviews?: number
    district?: string
    city?: string
    street_name?: string
    street_number?: string
    allow_pet?: boolean
    availability?: boolean
    address: string
    price: number
    imageLink: string
    max_num_children: number
    max_num_adults: number
    pricing_config: IPricingConfig
    avg_rating?: number,
    reviews?: Review[]
}

interface ICreateHomestay {
    name: string
    price: number
    description: string
    max_num_children: number
    max_num_adults: number
    allow_pet: boolean
    availability: boolean
    district: string
    city: string
    street_name: string
    street_number: string
    manager_id: string
    pricing_config_id: number
}

interface IHomestayPage {
    current_page: number,
    max_page: number,
    data: HomestayInfo[]
}

interface ManagerInfo {
    id: string
    name: string
    username: string
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

interface IBookingService {
    id: number,
    price: number,
    description: string,
    availability: boolean,
    service_type_id: number,
    service_type: IServiceType,
    checked: boolean
}

interface PricingConfig {
    depositPercentage: number,
    freeCancelationDays: number,
    cancelationRefund: number
}

interface IPricingConfig {
    id: number,
    name: string,
    deposit_percentage: number,
    cancellation_refund_percentage: number,
    free_cancellation_days: number,
    discount: number
}

interface ReserveBookingInfo{
    checkin_date: string,
    checkout_date: string,
    num_adults: number,
    num_children: number
}

interface BookingPeriod{
    from: string,
    to: string
}

interface TokenPair{
    token: string,
    refreshToken: string
}

export interface UserDetail{
    id?: string,
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
    is_superuser: boolean,
    is_staff: boolean,
    deleted_at?: Date
}

interface BookingInfo {
    id: number,
    checkin_date: string,
    checkout_date: string,
    status: string,
    total_price: number,
    comment?: string,
    rating?: number
}

export {StarType, 
    type HomestayInfo, 
    type ManagerInfo,
    type PricingConfig, 
    type Review, 
    type TokenPair,
    type IService,
    type IServiceType,
    type IBookingService,
    type IPricingConfig,
    type ReserveBookingInfo,
    type BookingPeriod,
    type BookingInfo,
    type IHomestayPage,
    type ICreateHomestay
};