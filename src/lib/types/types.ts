enum StarType{
    FULL = 'full',
    HALF = 'half',
    NONE = 'none'
}

interface HomestayInfo {
    name: string
    stars: number
    numReviews: number
    address: string
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
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    streetName?: string,
    streetNumber?: string,
    district?: string,
    city?: string,
    avatar?: string,
    email?: string,
}

export {StarType, type HomestayInfo, type PricingConfig, type Review, type TokenPair};