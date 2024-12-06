import { Injectable } from '@nestjs/common';

import { ProductDto } from './dtos/product.dto';
import {
  RegisterProductDto,
  RegisterProductSchema,
} from './dtos/register-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async registerProduct(
    userId: number,
    registerProductDto: RegisterProductDto,
  ): Promise<ProductDto> {
    try {
      RegisterProductSchema.parse(registerProductDto);
    } catch (e) {
      throw new Error(e.errors[0].message);
    }

    const product = await this.productsRepository.create(
      userId,
      registerProductDto,
    );

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toNumber(),
    };
  }

  async searchProducts(userId: number, id?: number): Promise<ProductDto[]> {
    const products = await this.productsRepository.read(userId, id);

    return products.map((e) => ({
      id: e.id,
      name: e.name,
      price: e.price.toNumber(),
      description: e.description,
    }));
  }

  async editProduct(
    userId: number,
    id: number,
    registerProductDto: RegisterProductDto,
  ): Promise<ProductDto> {
    try {
      RegisterProductSchema.parse(registerProductDto);
    } catch (e) {
      throw new Error(e.errors[0].message);
    }

    const product = await this.productsRepository.update(
      userId,
      id,
      registerProductDto,
    );

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toNumber(),
    };
  }

  async removeProduct(userId: number, productId: number): Promise<void> {
    await this.productsRepository.delete(userId, productId);
  }
}
