import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    
    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new ForbiddenException('Требуется авторизация');

   
    const roleSingle: string | undefined = (user as any).role;
    const rolesArray: string[] = Array.isArray((user as any).roles)
      ? (user as any).roles
      : roleSingle
      ? [roleSingle]
      : [];

    const ok = required.some((r) => rolesArray.includes(r));
    if (!ok) throw new ForbiddenException('Недостаточно прав');

    return true;
  }
}
