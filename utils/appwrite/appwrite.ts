import { Account, Client, Databases, Storage } from 'appwrite';
import { API_ENDPOINT, PROJECT_ID } from '~/utils/appwrite/constants';

// const config = useRuntimeConfig();
export const client = new Client();

client
  // .setEndpoint(config.public.apiEndpoint)
  // .setProject(config.public.projectId);
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID);

export const account = new Account(client);
export { ID } from 'appwrite';
export const DB = new Databases(client);
export const storage = new Storage(client);
