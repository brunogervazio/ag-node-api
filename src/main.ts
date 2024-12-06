import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { hostConfig } from './configs/host.config';

async function bootstrap() {
  const { host, port } = hostConfig;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AG Api')
    .setDescription('Api de produtos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(port ?? 3000, () => {
    console.log(`Server running on port http://${host}:${port}`);
    console.log(`Access the documentation http://${host}:${port}/api-doc`);
  });
}

bootstrap();
