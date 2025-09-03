import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Неверные учётные данные');
    }
    return {
      _id: String(user._id),
      email: user.email,
      role: (user as any).role,
      username: (user as any).username,
    };
  }


  login(user: { _id: string; email: string; role: string }) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }
}
