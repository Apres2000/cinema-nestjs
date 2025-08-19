import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
      ignoreExpiration: true, 
    });
  }

  async validate(payload: { email: string }) {
    const user: any = await this.usersService.findByEmail(payload.email);
    if (!user) return null;
    const { password, token, ...safe } = user;
    return safe;
  }
}
