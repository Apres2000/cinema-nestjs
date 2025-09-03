import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AuthGuard } from '@nestjs/passport';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: any, @Body() dto: CreatePlaylistDto) {
    return this.playlistsService.create(req.user._id, dto);
  }

  
  @UseGuards(OptionalJwtGuard)
  @Get()
  findAll(@Req() req: any) {
    if (req.user) {
      return this.playlistsService.findForUser(req.user._id);
    }
    return this.playlistsService.findPublic();
  }

  
  @UseGuards(OptionalJwtGuard)
  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    const userId: string | null = req.user ? req.user._id : null;
    return this.playlistsService.findOneFor(userId, id);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdatePlaylistDto) {
    return this.playlistsService.update(id, dto, req.user._id);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.playlistsService.remove(id, req.user._id);
  }
}
