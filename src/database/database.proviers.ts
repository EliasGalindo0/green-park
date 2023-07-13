import { Sequelize } from 'sequelize-typescript';
import { Boletos } from 'src/boletos/boletos.entity';
import { Lotes } from 'src/lotes/lotes.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'green-park',
      });
      sequelize.addModels([Boletos, Lotes]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
