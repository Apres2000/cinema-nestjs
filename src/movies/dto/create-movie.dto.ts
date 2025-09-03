import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 2010, minimum: 1888 })
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @ApiProperty({ example: 148, description: 'Длительность (мин)' })
  @IsInt()
  @Min(1)
  duration: number;

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
