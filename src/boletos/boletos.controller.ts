import { Controller, Get, Post } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { Boletos } from './boletos.entity';

@Controller('boletos')
export class BoletosController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly boletosService: BoletosService) { }

  @Post()
  async create(): Promise<void> {
    return await this.boletosService.create();
  }

  @Get()
  async getAll(): Promise<Boletos[]> {
    return await this.boletosService.findAll();
  }
}
