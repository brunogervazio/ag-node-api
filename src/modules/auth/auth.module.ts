import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtMiddleware } from '@/common/middlewares/jwt.middleware';
import { JwtSecurity } from '@/common/security/jwt.security';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService, JwtSecurity],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes(AuthController);
  }
}
