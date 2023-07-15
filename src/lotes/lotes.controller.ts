import { Body, Controller, Get, Post } from '@nestjs/common';
import { LotesService } from './lotes.service';
import { Lotes } from './lotes.entity';

@Controller('lotes')
export class LotesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly lotesService: LotesService) { }

  @Post()
  async createLotes(@Body() loteInfo: Lotes): Promise<void> {
    try {
      return await this.lotesService.create(loteInfo);
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  async getLotes(): Promise<Lotes[]> {
    try {
      return await this.lotesService.findAll();
    } catch (error) {
      console.error(error);
    }
  }
}
