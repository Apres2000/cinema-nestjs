import { IsNotEmpty, IsOptional, IsString, IsArray, IsDateString } from 'class-validator';
import { IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'Название фильма' })
  @IsNotEmpty()
  @IsString()
  title: string;
  year!: number;
  duration!: number; 
  genres?: string[];    
  directors?: string[];

  @ApiPropertyOptional({ description: 'Описание фильма' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'ID жанров', type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  

  @ApiPropertyOptional({ description: 'ID режиссёра' })
  @IsOptional()
  @IsMongoId()
  director?: string;

  @ApiPropertyOptional({ description: 'Дата выхода' })
  @IsOptional()
  @IsDateString()
  releaseDate?: string;
}
