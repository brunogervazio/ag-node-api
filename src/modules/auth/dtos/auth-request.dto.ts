import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const AuthSchema = z.object({
  email: z.string().email('O e-mail fornecido é inválido'),
  password: z.string(),
});

export class AuthRequestDto {
  @ApiProperty({
    description: 'email',
    example: 'johndoe@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'password',
    example: '123@Password',
  })
  password: string;
}
