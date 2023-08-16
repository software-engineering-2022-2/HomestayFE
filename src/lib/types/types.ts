
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
    manager_id: string
    name: string
    description: string
    address?: string
    price: number
    image: string
    max_num_children: number
    max_num_adults: number
    pricing_config_id: IPricingConfig | number
    numReviews?: number
    avg_rating?: number
    reviews?: Review[]
    availability?: boolean
    street_name?: string
    street_number?: string
    district?: string
    city?: string
    allow_pet?: boolean
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
    id: string,
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
    is_manager?: boolean
    is_superuser?: boolean
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

export interface MonthlyRating {
    date: string,
    num_bookings: number,
    num_rated_bookings: number,
    avg_rating: number,
    total_price: number
}

export interface HomestayAnalytics {
    homestay_id: string,
    homestay_name: string,
    ratings: MonthlyRating[],
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
    type BookingInfo
};