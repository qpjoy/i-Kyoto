import { SetMetadata } from '@nestjs/common';

export const ResponseMessageKey = 'ResponseMessageKey';
// export const ResponseCodeKey = 'ResponseCodeKey';
export const ResponseMessage = (message: string) => {
  return SetMetadata(ResponseMessageKey, message);
  //   SetMetadata(ResponseDataKey, res?.code);
};
