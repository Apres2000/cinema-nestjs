import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ example: 'Drama', description: 'Название жанра' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
