import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { randomInt } from 'crypto';

import { RegisterDto, RegisterSchema } from './dtos/register.dto';
import { AuthRequestDto } from './dtos/auth-request.dto';
import { UserDto } from './dtos/user.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { AuthRepository } from './auth.repository';
import { JwtSecurity } from '@/common/security/jwt.security';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtSecurity: JwtSecurity,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<UserDto> {
    const userFound = await this.authRepository.findUserByEmail(
      registerDto.email,
    );

    try {
      RegisterSchema.parse(registerDto);
    } catch (e) {
      throw new Error(e.errors[0].message);
    }

    if (userFound) throw new Error('Email já registrado');

    const passwordEncrypted = await hash(
      registerDto.password,
      randomInt(10, 16),
    );
    const userCreated = await this.authRepository.createUser({
      email: registerDto.email,
      password: passwordEncrypted,
    });

    return { email: userCreated.email };
  }

  async authUser(authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    const userFound = await this.authRepository.findUserByEmail(
      authRequestDto.email,
    );
    const isValidPassword = await compare(
      authRequestDto.password,
      userFound?.password || '',
    );

    if (!isValidPassword) throw new Error('Email ou senha inválido');

    return {
      token: this.jwtSecurity.genToken({
        id: userFound.id,
        email: userFound.email,
      }),
    };
  }

  async getUser(id: number): Promise<UserDto> {
    const { email } = await this.authRepository.getUserById(id);
    return { email };
  }
}
