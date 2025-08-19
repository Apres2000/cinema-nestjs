import { Controller, Get, } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  
  @Get()
  @ApiOperation({ summary: 'Получить текущего пользователя (по JWT токену)' })
  @ApiResponse({ status: 200, description: 'Информация о пользователе' })
  getProfile(@CurrentUser() user: any) {
    return {
      message: 'Вы успешно авторизованы!',
      user,
    };
  }
}
