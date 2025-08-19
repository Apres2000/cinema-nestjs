import { Controller, Get, Post, Body, Param, Delete, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AddMovieDto } from './dto/add-movie.dto';
import { SetVisibilityDto } from './dto/set-visibility.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Playlists')
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlists: PlaylistsService) {}

  
  @ApiBearerAuth()
  @Post()
  create(@Req() req: Request, @Body() dto: CreatePlaylistDto) {
    const user = (req as any).user as { _id: string };
    return this.playlists.create(user._id, dto.name, dto.visibility ?? 'private');
  }

  
  @ApiBearerAuth()
  @Get('me')
  findMine(@Req() req: Request) {
    const user = (req as any).user as { _id: string };
    return this.playlists.findMine(user._id);
  }

  
  @Public()
  @Get('public')
  findPublic() {
    return this.playlists.findPublic();
  }

  
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    const user = (req as any).user as { _id?: string } | undefined;
    return this.playlists.findOneForViewer(id, user?._id);
  }

 
  @ApiBearerAuth()
  @Put(':id/add')
  add(@Req() req: Request, @Param('id') id: string, @Body() dto: AddMovieDto) {
    const user = (req as any).user as { _id: string };
    return this.playlists.addMovie(id, user._id, dto.movieId);
  }

  
  @ApiBearerAuth()
  @Put(':id/remove')
  removeMovie(@Req() req: Request, @Param('id') id: string, @Body() dto: AddMovieDto) {
    const user = (req as any).user as { _id: string };
    return this.playlists.removeMovie(id, user._id, dto.movieId);
  }

  
  @ApiBearerAuth()
  @Put(':id/visibility')
  setVisibility(@Req() req: Request, @Param('id') id: string, @Body() dto: SetVisibilityDto) {
    const user = (req as any).user as { _id: string };
    return this.playlists.setVisibility(id, user._id, dto.visibility);
  }

  
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    const user = (req as any).user as { _id: string };
    return this.playlists.remove(id, user._id);
  }
}
