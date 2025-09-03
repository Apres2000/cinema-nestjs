import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }

  @UseGuards(OptionalJwtGuard)
  @ApiQuery({
    name: 'full',
    required: false,
    description: 'Если full=1 (или есть токен), вернутся полные данные',
  })
  @Get()
  async findAll(@Req() req: any, @Query('full') full?: string) {
    const hasToken = Boolean(req.user);
    if (hasToken || full === '1') {
      return this.movieService.findAllDetailed();
    }
    return this.movieService.findAllTitles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.movieService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
