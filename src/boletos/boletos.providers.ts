import { Boletos } from './boletos.entity';

export const boletosProviders = [
  {
    provide: 'BOLETOS_PROVIDERS',
    useValue: Boletos,
  },
];
