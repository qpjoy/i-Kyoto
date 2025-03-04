import { Expose } from 'class-transformer';

export class CreateDeviceDto {
  @Expose()
  readonly userId?: string;

  @Expose()
  readonly name: string;
  @Expose()
  readonly desc: string;
  @Expose()
  readonly content: string;
}
