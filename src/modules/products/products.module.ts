import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { JwtMiddleware } from '@/common/middlewares/jwt.middleware';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, PrismaService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(ProductsController);
  }
}
