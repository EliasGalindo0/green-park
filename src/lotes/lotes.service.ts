import { Inject, Injectable } from '@nestjs/common';
import { Lotes } from './lotes.entity';

@Injectable()
export class LotesService {
  constructor(
    @Inject('LOTES_PROVIDERS')
    private lotesRepository: typeof Lotes,
  ) { }

  async create(loteInfo: Lotes): Promise<any> {
    try {
      const { id, nome } = loteInfo;
      return this.lotesRepository.create({
        id,
        nome,
        ativo: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(): Promise<Lotes[]> {
    try {
      return this.lotesRepository.findAll<Lotes>();
    } catch (error) {
      console.error(error);
    }
  }
}
