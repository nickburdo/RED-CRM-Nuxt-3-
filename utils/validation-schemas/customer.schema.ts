import { object, string } from 'yup';

export interface FormFields {
  name: string;
  email: string;
  avatarUrl: string;
  fromSource?: string;
}

export const customerSchema = object({
  name: string().required().label('Name'),
  email: string().required().email().label('Email'),
  avatarUrl: string().required().label('Avatar'),
  fromSource: string().nullable().label('From'),
})
