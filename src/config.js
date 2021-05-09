
export const config = {
    BASE_API_URL: process.env.REACT_APP_BASE_API_URL || 'http://localhost:3000',
    BASE_ROOT_URL: process.env.REACT_APP_BASE_ROOT_URL || 'http://localhost:3000',
    REACT_APP_STRIPE_KEY : process.env.REACT_APP_STRIPE_KEY || '',
    REACT_APP_PAYPAL_SANDBOX_APP_ID : process.env.REACT_APP_PAYPAL_SANDBOX_APP_ID || '',
    REACT_APP_PAYPAL_PRODUCTION_APP_ID : process.env.REACT_APP_PAYPAL_PRODUCTION_APP_ID || '',
    REACT_APP_PAYPAL_ENV : process.env.REACT_APP_PAYPAL_ENV || 'sandbox',
}