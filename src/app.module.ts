import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoletosModule } from './boletos/boletos.module';
import { LotesModule } from './lotes/lotes.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    BoletosModule,
    LotesModule,
    MulterModule.register({
      dest: '/Users/eliasgalindo/Dev/test-backend/green-park/src/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
