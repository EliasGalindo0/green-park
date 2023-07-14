import { Module } from '@nestjs/common';
import { databaseProviders } from './database.proviers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
// eslint-disable-next-line prettier/prettier
export class DatabaseModule { }
