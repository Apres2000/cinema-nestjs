import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesController } from './movies.controller';
import { MovieService } from './movie.service';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
  controllers: [MoviesController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MoviesModule {}
