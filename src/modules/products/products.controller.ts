import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { RegisterProductDto } from './dtos/register-product.dto';

@ApiTags('Produtos')
@Controller('produtos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cadastrar produto' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Produto cadastrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autorizado',
  })
  async postProduct(
    @Body() registerProductDto: RegisterProductDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const result = await this.productsService.registerProduct(
        request['user'].id,
        registerProductDto,
      );
      response.status(HttpStatus.CREATED).send(result);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar produtos cadastrados' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autorizado',
  })
  async getProducts(@Req() request: Request, @Res() response: Response) {
    try {
      const result = await this.productsService.searchProducts(
        request['user'].id,
      );
      response.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Consultar produto cadastrado' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autorizado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produto',
    type: Number,
    required: true,
  })
  async getProduct(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const result = await this.productsService.searchProducts(
        request['user'].id,
        id,
      );
      response.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar cadastro de produto' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto alterado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autorizado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produto',
    type: Number,
    required: true,
  })
  async putProduct(
    @Body() registerProductDto: RegisterProductDto,
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const result = await this.productsService.editProduct(
        request['user'].id,
        id,
        registerProductDto,
      );
      response.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir produto' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Produto excluido',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autorizado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produto',
    type: Number,
    required: true,
  })
  async deleteProduct(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const result = await this.productsService.removeProduct(
        request['user'].id,
        id,
      );
      response.status(HttpStatus.NO_CONTENT).send(result);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
