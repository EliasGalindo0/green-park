import { Controller } from '@nestjs/common';
import { BoletosService } from './boletos.service';

@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}
}
