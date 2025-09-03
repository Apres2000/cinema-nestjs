import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdatePlaylistDto {
  @ApiPropertyOptional({ example: 'Лучшие 2020-2025' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: true, description: 'Публичный список' })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({ example: ['<movieId>'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  movies?: string[];
}
