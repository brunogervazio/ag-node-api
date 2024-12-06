import { Module } from '@nestjs/common';

import { UserModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/products/products.module';

@Module({
  imports: [UserModule, ProductModule],
})
export class AppModule {}
