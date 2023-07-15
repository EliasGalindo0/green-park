import { Body, Controller, Get, Post } from '@nestjs/common';
import { LotesService } from './lotes.service';
import { Lotes } from './lotes.entity';

@Controller('lotes')
export class LotesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly lotesService: LotesService) { }

  @Post()
  async createLotes(@Body() loteInfo: Lotes): Promise<void> {
    return await this.lotesService.create(loteInfo);
  }

  @Get()
  async getLotes(): Promise<Lotes[]> {
    return await this.lotesService.findAll();
  }
}
