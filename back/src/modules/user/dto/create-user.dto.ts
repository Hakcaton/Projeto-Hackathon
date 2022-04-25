import { ePermission } from 'src/tools/enum/permission.definition';

export class CreateUserDto {
  email: string;
  password: string;
  permission: ePermission;
  name: string;
  lastName: string;
}
