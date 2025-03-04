import { Expose } from 'class-transformer';

export class CreateMessageDto {
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
