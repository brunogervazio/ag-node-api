import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { AuthRequestDto } from './dtos/auth-request.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Criar usuario' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos.',
  })
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    try {
      const result = await this.authService.registerUser(registerDto);
      response.status(HttpStatus.CREATED).send(result);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuario' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário autenticado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Acesso não autorizado',
  })
  async login(
    @Body() authRequestDto: AuthRequestDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.authService.authUser(authRequestDto);
      response.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Consultar perfil de usuario' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sucesso',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autorizado',
  })
  async getProfile(@Req() request: Request, @Res() response: Response) {
    try {
      const result = await this.authService.getUser(request['user'].id);
      response.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
