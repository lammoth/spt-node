import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { BaseModel } from '@common/models/base.model';
import { Role } from '@prisma/client';
import { ChangePasswordInput } from '../dto/change-password.input';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  email: string;
  firstname?: string;
  lastname?: string;
  @Field(() => Role)
  role: Role;
  @HideField()
  password: string;
}

export class UserPasswordData {
  userId: string;
  userPassword: string;
  changePassword: ChangePasswordInput;
}
