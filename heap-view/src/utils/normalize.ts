import { toPhoneNumber } from 'utils/format';

export const number = (value: string) => (value || '').replace(/[^0-9]/g, '');

export const phoneNumber = (value: string) => toPhoneNumber(value);
