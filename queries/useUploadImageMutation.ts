import { useMutation } from '@tanstack/vue-query';
import { storage } from '~/utils/appwrite/appwrite';
import { STORAGE_IMAGES_ID } from '~/utils/appwrite/constants';
import { v4 as uuid } from 'uuid';

export const useUploadImageMutation = (successCb: (url: URL) => void) => useMutation({
  mutationFn: (file: File) => storage.createFile(STORAGE_IMAGES_ID, uuid(), file),
  onSuccess: (data) => {
    const url = storage.getFileDownload(STORAGE_IMAGES_ID, data.$id);
    successCb(url);
  },
  onError: (error) => {
    console.log({error});
    alert('Failed File Upload');
  }
});