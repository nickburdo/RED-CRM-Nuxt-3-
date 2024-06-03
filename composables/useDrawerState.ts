import { useState } from '#app';

export const useDrawerState = () => useState<boolean>('drawer', () => false);
