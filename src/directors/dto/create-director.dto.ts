import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateDirectorDto {
  @ApiProperty({ example: 'Christopher Nolan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1970-07-30', description: 'Дата рождения' })
  @IsDateString()
  birthDate: string;
}
