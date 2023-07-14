import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { Boletos } from './boletos.entity';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCSV(@UploadedFile() file: Express.Multer.File): Promise<void> {
    console.log(file);

    return await this.boletosService.createFromCSV(file);
  }
}
