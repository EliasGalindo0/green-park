import { Controller, Get, Post } from '@nestjs/common';
import { LotesService } from './lotes.service';
import { Lotes } from './lotes.entity';

@Controller('lotes')
export class LotesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly lotesService: LotesService) { }

  @Post()
  async createLotes(): Promise<void> {
    return await this.lotesService.create();
  }

  @Get()
  async getLotes(): Promise<Lotes[]> {
    return await this.lotesService.findAll();
  }
}
