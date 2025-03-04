import { Article } from './entities/article.entity';

export const ArticlesProviders = [
  { provide: 'ArticlesRepository', useValue: Article },
];
