import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const RegisterSchema = z
  .object({
    email: z.string().email('O e-mail fornecido é inválido'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número.')
      .regex(
        /[@$!%*?&]/,
        'A senha deve conter pelo menos um caractere especial.',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export class RegisterDto {
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

  @ApiProperty({
    description: 'passwordConfirm',
    example: '123@Password',
  })
  passwordConfirm: string;
}
