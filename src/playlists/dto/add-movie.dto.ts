import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class AddMovieDto {
  @ApiProperty({ example: '68b58203245351989a338193' })
  @IsMongoId()
  movieId: string;
}
