import { Expose } from 'class-transformer';

export class CreateHelpDto {
  @Expose()
  readonly name: string;
  @Expose()
  readonly url: string;
  @Expose()
  readonly desc: string;
  @Expose()
  readonly isActive: boolean;
  @Expose()
  readonly others: object;
}
