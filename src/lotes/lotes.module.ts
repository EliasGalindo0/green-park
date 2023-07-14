import { Module } from '@nestjs/common';
import { LotesService } from './lotes.service';
import { LotesController } from './lotes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { lotesProviders } from './lotes.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LotesController],
  providers: [LotesService, ...lotesProviders],
})
export class LotesModule { }
