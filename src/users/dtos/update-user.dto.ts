import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
