import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { Boletos } from './boletos.entity';

@Controller('boletos')
export class BoletosController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly boletosService: BoletosService) { }

  @Post()
  async create(@Body() boleto: Boletos): Promise<void> {
    return await this.boletosService.create(boleto);
  }

  @Get()
  async getAll(): Promise<Boletos[]> {
    return await this.boletosService.findAll();
  }
}
