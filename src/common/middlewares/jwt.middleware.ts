import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    try {
      const authHeader = request.headers['authorization'];
      const token = authHeader?.split(' ')[1];

      if (!token) throw new UnauthorizedException('Token não fornecido');

      const payload = verify(token, process.env.SECRET_KEY);
      request['user'] = payload;

      next();
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
