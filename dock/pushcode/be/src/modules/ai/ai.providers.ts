import { Ai } from './entities/ai.entity';

export const AiProviders = [
  {
    provide: 'AiRepository',
    useValue: Ai,
  },
];
