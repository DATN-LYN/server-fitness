import { GENDER, ROLE } from '@/common/constant';
import { User } from '@/db/entities/User';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

@ObjectType({ isAbstract: true })
export class LoginResponseDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken: string;
}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class LoginInputDto {
  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  expiresIn: string;

  @Field({ nullable: true })
  token: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;
}

@ObjectType()
export class CreateUserSocial {
  @Field()
  email: string;

  @Field({ nullable: true })
  googleId: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  isVerified: boolean;
}

@ObjectType()
export class CreateAccessTokenDto {
  @Field(() => ID)
  id?: string;

  @Field({ nullable: true })
  email?: string;

  // @Field({ nullable: true })
  // avatar?: string;

  // @Field({ nullable: true })
  // createdAt?: Date;

  // @Field({ nullable: true })
  // updatedAt?: Date;
}

@ObjectType()
export class CreateAccessTokenResponseDto {
  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  refreshToken: string;
}

@ObjectType({ isAbstract: true })
export class RefreshTokenResponseDto {
  @Field()
  token: string;
}

@InputType({ isAbstract: true })
export class RegisterInputDto {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  avatar: string;

  @Field()
  age: number;

  @Field()
  fullName: string;

  @Field(() => GENDER, { nullable: true })
  @IsEnum(GENDER, { message: 'GENDER'})
  gender: GENDER;


  @Field(() => ROLE, { nullable: true })
  @IsEnum(ROLE, { message: 'ROLE'})
  userRole: ROLE;
}

@InputType({ isAbstract: true })
export class ChangePasswordInputDto {
  @Field({ nullable: true })
  oldPassword: string;

  @Field({ nullable: true })
  newPassword: string;
}
