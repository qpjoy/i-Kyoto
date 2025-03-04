import { Device } from './entities/device.entity';

export const DevicesProviders = [
  {
    provide: 'DevicesRepository',
    useValue: Device,
  },
];
