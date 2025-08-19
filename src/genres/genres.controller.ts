
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  
  @Public()
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  
  @ApiBearerAuth()
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateGenreDto) {
    return this.genresService.create(dto);
  }

  @ApiBearerAuth()
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    return this.genresService.update(id, dto);
  }

  @ApiBearerAuth()
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}
