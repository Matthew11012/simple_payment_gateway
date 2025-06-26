import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { UserSession } from '@/types';
import { COOKIE_CONFIG } from '@/config';

// Create a new session
export const createSession = (): UserSession => {
  const session: UserSession = {
    sessionId: uuidv4(),
    hasPaidAccess: false,
    expiresAt: new Date(Date.now() + COOKIE_CONFIG.maxAge * 1000),
  };
  
  Cookies.set(COOKIE_CONFIG.sessionName, JSON.stringify(session), {
    expires: COOKIE_CONFIG.maxAge / (60 * 60 * 24), // Convert seconds to days
    path: COOKIE_CONFIG.path,
  });
  
  return session;
};

// Get current session or create a new one
export const getSession = (): UserSession => {
  const sessionCookie = Cookies.get(COOKIE_CONFIG.sessionName);
  
  if (!sessionCookie) {
    return createSession();
  }
  
  try {
    const session = JSON.parse(sessionCookie) as UserSession;
    return session;
  } catch (error) {
    return createSession();
  }
};

// Update session with payment information
export const updateSession = (paymentId: string, hasPaidAccess: boolean): UserSession => {
  const session = getSession();
  
  const updatedSession: UserSession = {
    ...session,
    paymentId,
    hasPaidAccess,
  };
  
  Cookies.set(COOKIE_CONFIG.sessionName, JSON.stringify(updatedSession), {
    expires: COOKIE_CONFIG.maxAge / (60 * 60 * 24),
    path: COOKIE_CONFIG.path,
  });
  
  return updatedSession;
};