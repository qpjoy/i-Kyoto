import { v5 } from 'uuid';

export class FuncHelper {
  static matrixToArr = (str, arr) => {
    const statusArr = str.trim().split('\n');
    const statusMappings = statusArr.map((status) => {
      const ss = status.split(' ');
      return {
        [arr[0]]: ss[0],
        [arr[1]]: ss[ss.length - 1],
      };
    });
    return statusMappings;
  };

  static safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
      obj,
      (key, value) =>
        typeof value === 'object' && value !== null
          ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
          : value,
      indent,
    );
    cache = null;
    return retVal;
  };

  static uuid2 = (len, radix) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      // rfc4122, version 4 form
      let r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };

  // namespace: f14334d9-576f-4449-a800-1ce224dae9d0
  static uuidByString = (str) => {
    return v5(str, 'f14334d9-576f-4449-a800-1ce224dae9d0');
  };
}
