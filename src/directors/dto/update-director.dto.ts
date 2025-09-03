import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateDirectorDto {
  @ApiPropertyOptional({ example: 'Denis Villeneuve' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '1967-10-03' })
  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
