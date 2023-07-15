import {
  Body,
  Controller,
  Get,
  Post,
  Query,
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCSV(@UploadedFile() file: Express.Multer.File): Promise<void> {
    return await this.boletosService.createFromCSV(file);
  }

  @Post('upload-pdf')
  @UseInterceptors(FileInterceptor('pdf'))
  async uploadPDF(@UploadedFile() file: Express.Multer.File): Promise<void> {
    return await this.boletosService.splitPDF(file);
  }

  // @Get()
  // async getAll(): Promise<Boletos[]> {
  //   return await this.boletosService.findAll();
  // }

  @Get()
  async getAllBoletos(
    @Query('nome') nome: string,
    @Query('valor_inicial') valorInicial: number,
    @Query('valor_final') valorFinal: number,
    @Query('id_lote') id_lote: number,
  ) {
    try {
      const boletos = await this.boletosService.getAllBoletos(
        nome,
        valorInicial,
        valorFinal,
        id_lote,
      );
      return boletos;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar boletos.');
    }
  }
}
