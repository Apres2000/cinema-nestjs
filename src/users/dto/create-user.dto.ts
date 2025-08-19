import { IsEmail, IsNotEmpty, IsString, MinLength, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ isArray: true, required: false })
  @IsArray()
  @IsString({ each: true })
  roles?: string[];
}
