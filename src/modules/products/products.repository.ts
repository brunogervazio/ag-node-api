import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

import { RegisterProductDto } from './dtos/register-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    product: RegisterProductDto,
  ): Promise<Product | null> {
    return await this.prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        userId,
      },
    });
  }

  async read(userId: number, productId?: number): Promise<Product[] | null> {
    return productId
      ? await this.prisma.product.findMany({
          where: { id: +productId, userId },
        })
      : await this.prisma.product.findMany({
          where: { userId },
          orderBy: {
            id: 'asc',
          },
        });
  }

  async update(
    userId: number,
    productId: number,
    data: RegisterProductDto,
  ): Promise<Product | null> {
    return await this.prisma.product.update({
      where: { userId, id: +productId },
      data: {
        name: data.name,
        description: data.description,
        price: data.price.toString(),
      },
    });
  }

  async delete(userId: number, productId: number) {
    await this.prisma.product.delete({
      where: { userId, id: +productId },
    });
  }
}
