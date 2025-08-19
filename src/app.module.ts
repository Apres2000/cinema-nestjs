// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { JwtGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/roles.guard';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { GenresModule } from './genres/genres.module';
import { DirectorsModule } from './directors/directors.module';
import { MoviesModule } from './movies/movies.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cinema'),
    UsersModule,
    AuthModule,
    GenresModule,
    DirectorsModule,
    MoviesModule,
    PlaylistsModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtGuard },   
    { provide: APP_GUARD, useClass: RolesGuard }, 
  ],
})
export class AppModule {}
