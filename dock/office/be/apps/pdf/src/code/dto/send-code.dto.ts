import { Expose } from 'class-transformer';

export class SendCodeDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly uuid: string;

  @Expose()
  readonly value: string;

  @Expose()
  readonly expiredAt: Date;
}
