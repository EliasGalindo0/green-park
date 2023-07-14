import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Lotes } from './lotes.entity';

@Injectable()
export class LotesService {
  constructor(
    @Inject('LOTES_PROVIDERS')
    private lotesRepository: typeof Lotes,
  ) { }

  async findAll(): Promise<Lotes[]> {
    try {
      return this.lotesRepository.findAll<Lotes>();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(): Promise<any> {
    return this.lotesRepository.create();
  }
}
