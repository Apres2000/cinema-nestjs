import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Directors')
@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.directorsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorsService.findOne(id);
  }

  
  @ApiBearerAuth()
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateDirectorDto) {
    return this.directorsService.create(dto);
  }

  @ApiBearerAuth()
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDirectorDto) {
    return this.directorsService.update(id, dto);
  }

  @ApiBearerAuth()
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorsService.remove(id);
  }
}
