import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './schemas/director.schema';
import { DirectorsController } from './directors.controller';
import { DirectorsService } from './directors.service';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Director.name, schema: DirectorSchema }])],
  controllers: [DirectorsController],
  providers: [DirectorsService, RolesGuard],
})
export class DirectorsModule {}
