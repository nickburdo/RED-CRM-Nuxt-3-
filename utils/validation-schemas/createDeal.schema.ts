import { number, object, string } from 'yup';

export interface FormFields {
  name: string;
  price: number;
  customerName: string;
  customerEmail: string;
}

export const createDealSchema = object({
  name: string().required().label('Name'),
  price: number().required().typeError('${label} must be a number').label('Price'),
  customerName: string().required().label('Customer Name'),
  customerEmail: string().required().email().label('Customer Email'),
})
