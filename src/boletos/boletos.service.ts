import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Boletos } from './boletos.entity';
import { Lotes } from 'src/lotes/lotes.entity';

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
}
