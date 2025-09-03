import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ example: 'Мой список' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: ['<movieId>'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  movies?: string[];
}
