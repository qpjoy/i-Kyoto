import { File } from './entities/file.entity';

export const FilesProviders = [{ provide: 'FilesRepository', useValue: File }];
