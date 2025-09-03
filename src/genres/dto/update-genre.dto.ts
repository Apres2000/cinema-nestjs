import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGenreDto {
  @ApiPropertyOptional({ example: 'Sci-Fi' })
  @IsOptional()
  @IsString()
  name?: string;
}
