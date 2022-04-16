import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const jwtConstants = {
    secret: '3052f3a6-c179-4e6d-93a3-c11eecac645c',
  };