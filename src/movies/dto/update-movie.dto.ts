import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsMongoId, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateMovieDto {
  @ApiPropertyOptional({ example: 'Interstellar' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 2014 })
  @IsOptional()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear() + 1)
  year?: number;

  @ApiPropertyOptional({ example: 169 })
  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @ApiPropertyOptional({ example: ['<genreId>'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  genres?: string[];

  @ApiPropertyOptional({ example: ['<directorId>'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  directors?: string[];
}
