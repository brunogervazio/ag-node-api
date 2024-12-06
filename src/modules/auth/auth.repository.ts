import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: { email: string; password: string }): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
