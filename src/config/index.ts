export const XENDIT_CONFIG = {
    secretKey: process.env.XENDIT_SECRET_KEY || '',
    publicKey: process.env.XENDIT_PUBLIC_KEY || '',
  };
  
  export const APP_CONFIG = {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    webhookSecret: process.env.WEBHOOK_SECRET || '',
  };
  
  export const PACKAGE_CONFIG = {
    premium: {
      id: 'premium-package',
      name: 'Premium Package',
      description: 'Access to all premium content',
      price: Number(process.env.PREMIUM_PACKAGE_PRICE || 50000),
      currency: process.env.PREMIUM_PACKAGE_CURRENCY || 'IDR',
    },
  };
  
  export const COOKIE_CONFIG = {
    sessionName: 'payment-session',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  };