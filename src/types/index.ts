export type PaymentMethod = 'VIRTUAL_ACCOUNT' | 'CREDIT_CARD' | 'QR_CODE';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  xenditReferenceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

export interface UserSession {
  sessionId: string;
  hasPaidAccess: boolean;
  paymentId?: string;
  expiresAt: Date;
} 