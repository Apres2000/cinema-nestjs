import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GenresModule } from './genres/genres.module';
import { DirectorsModule } from './directors/directors.module';
import { MoviesModule } from './movies/movies.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/movies'),
    AuthModule,
    UsersModule,
    GenresModule,
    DirectorsModule,
    MoviesModule,
    PlaylistsModule,
  ],
})
export class AppModule {}
