import axios from 'axios';
import { XENDIT_CONFIG } from '@/config';
import { PaymentMethod } from '@/types';

const xenditApi = axios.create({
  baseURL: 'https://api.xendit.co',
  headers: {
    Authorization: `Basic ${Buffer.from(XENDIT_CONFIG.secretKey + ':').toString('base64')}`,
    'Content-Type': 'application/json',
  },
});

// Create a Virtual Account payment
export const createVirtualAccountPayment = async (
  externalId: string,
  amount: number,
  bankCode: string = 'BCA'
) => {
  try {
    const response = await xenditApi.post('/virtual_accounts', {
      external_id: externalId,
      bank_code: bankCode,
      name: 'Simple Payment Gateway User',
      expected_amount: amount,
      is_closed: true,
      expiration_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error creating VA:', error.response?.data || error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// Create a QR Code payment
export const createQrCodePayment = async (
  externalId: string,
  amount: number
) => {
  try {
    const response = await xenditApi.post('/qr_codes', {
      external_id: externalId,
      type: 'DYNAMIC',
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/callback`,
      amount,
      currency: 'IDR',
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error creating QR code:', error.response?.data || error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// Create a Card payment
export const createCardPayment = async (
  externalId: string,
  amount: number,
  cardToken: string
) => {
  try {
    const response = await xenditApi.post('/credit_card_charges', {
      external_id: externalId,
      token_id: cardToken,
      amount,
      currency: 'IDR',
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error creating card charge:', error.response?.data || error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// Create payment based on method
export const createPayment = async (
  externalId: string,
  amount: number,
  method: PaymentMethod,
  cardToken?: string
) => {
  switch (method) {
    case 'VIRTUAL_ACCOUNT':
      return createVirtualAccountPayment(externalId, amount);
    case 'QR_CODE':
      return createQrCodePayment(externalId, amount);
    case 'CREDIT_CARD':
      if (!cardToken) {
        return {
          success: false,
          error: 'Card token is required for credit card payments',
        };
      }
      return createCardPayment(externalId, amount, cardToken);
    default:
      return {
        success: false,
        error: 'Invalid payment method',
      };
  }
};