import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Boletos } from './boletos.entity';
import { Lotes } from 'src/lotes/lotes.entity';
import * as csv from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class BoletosService {
  constructor(
    @Inject('BOLETOS_PROVIDERS')
    private boletosRepository: typeof Boletos,
    @Inject('LOTES_PROVIDERS')
    private lotesRepository: typeof Lotes,
  ) { }

  async findAll(): Promise<Boletos[]> {
    try {
      return await this.boletosRepository.findAll<Boletos>();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(boleto: Boletos): Promise<any> {
    const { nome_sacado, valor, id_lote, linha_digitavel, ativo } = boleto;
    const lote = await this.lotesRepository.findByPk(id_lote);
    if (!lote) {
      throw new NotFoundException(`Lote with ID ${id_lote} not found`);
    }

    return await this.boletosRepository.create({
      nome_sacado,
      id_lote,
      valor,
      linha_digitavel,
      ativo,
    });
  }

  async createFromCSV(file: Express.Multer.File): Promise<void> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const stream = Readable.from(file.buffer.toString());

      const csvParserOptions: csv.Options = { separator: ';' };

      const csvParser = csv(csvParserOptions);

      stream
        .pipe(csvParser)
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          for (const result of results) {
            const lote = await this.lotesRepository.findByPk(result.unidade);

            console.log(result);

            if (!lote) {
              throw new NotFoundException(
                `Lote with ID ${result.unidade} not found`,
              );
            }

            await this.boletosRepository.create({
              nome_sacado: result.nome,
              id_lote: result.unidade,
              valor: parseFloat(result.valor),
              linha_digitavel: result.linha_digitavel,
              ativo: true,
            });
          }

          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
