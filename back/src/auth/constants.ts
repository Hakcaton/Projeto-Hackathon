import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'c949e81a-c422-4db1-8028-14aee9b31c18',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
