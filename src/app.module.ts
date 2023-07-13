import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoletosModule } from './boletos/boletos.module';
import { LotesModule } from './lotes/lotes.module';

@Module({
  imports: [BoletosModule, LotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
