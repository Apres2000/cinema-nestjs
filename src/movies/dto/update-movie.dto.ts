import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    title?: string;
    year?: number;
    duration?: number;
    genres?: string[];
    directors?: string[];
}
