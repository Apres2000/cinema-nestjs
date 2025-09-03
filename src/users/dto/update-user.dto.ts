import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'user@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'newpass123', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: 'Eduard' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'member', enum: ['admin', 'member'] })
  @IsOptional()
  @IsEnum(['admin', 'member'] as const)
  role?: 'admin' | 'member';
}
