import { Lotes } from './lotes.entity';

export const lotesProviders = [
  {
    provide: 'LOTES_PROVIDERS',
    useValue: Lotes,
  },
];
