import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const RegisterProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z
    .number()
    .positive('Preço deve ser maior que zero')
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: 'O número deve ter no máximo 2 casas decimais',
    }),
  description: z
    .string()
    .max(255, 'A descrição deve ter no máximo 255 caracteres')
    .optional(),
});

export class RegisterProductDto {
  @ApiProperty({
    description: 'name',
    example: 'Coca-Cola Lata',
  })
  name: string;

  @ApiProperty({
    description: 'description',
    example: 'Gelada',
  })
  description: string;

  @ApiProperty({
    description: 'price',
    example: 5.5,
  })
  price: number;
}
