import { Controller } from '@nestjs/common';
import { LotesService } from './lotes.service';

@Controller('lotes')
export class LotesController {
  constructor(private readonly lotesService: LotesService) {}
}
