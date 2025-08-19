import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Логин по email и паролю (без JWT)' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Строка Authorization' })
  async login(@Body() dto: LoginUserDto): Promise<{ authorization: string }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return {
      authorization: `${user.email} ${dto.password}`,
    };
  }
}
