import { Payment } from '@/types';

// In-memory storage for payments
const payments: Record<string, Payment> = {};

// Add a new payment
export const addPayment = (payment: Payment): Payment => {
  payments[payment.id] = payment;
  return payment;
};

// Get a payment by ID
export const getPayment = (id: string): Payment | null => {
  return payments[id] || null;
};

// Update a payment
export const updatePayment = (id: string, updates: Partial<Payment>): Payment | null => {
  if (!payments[id]) {
    return null;
  }
  
  payments[id] = {
    ...payments[id],
    ...updates,
    updatedAt: new Date(),
  };
  
  return payments[id];
};

// Get all payments
export const getAllPayments = (): Payment[] => {
  return Object.values(payments);
};