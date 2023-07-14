import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Boletos } from './boletos.entity';

@Injectable()
export class BoletosService {
  constructor(
    @Inject('BOLETOS_PROVIDERS')
    private boletosRepository: typeof Boletos,
  ) { }

  async findAll(): Promise<Boletos[]> {
    try {
      return await this.boletosRepository.findAll<Boletos>();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(): Promise<any> {
    return await this.boletosRepository.create();
  }
}
