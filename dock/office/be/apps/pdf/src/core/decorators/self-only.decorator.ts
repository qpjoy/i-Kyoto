import { SetMetadata } from '@nestjs/common';

export const SELF_ONLY_KEY = 'self_only';
export const SelfOnly = () => SetMetadata(SELF_ONLY_KEY, true);
