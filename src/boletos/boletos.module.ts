import { Module } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { BoletosController } from './boletos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { boletosProviders } from './boletos.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BoletosController],
  providers: [BoletosService, ...boletosProviders],
})
export class BoletosModule { }
