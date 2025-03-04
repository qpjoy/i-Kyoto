export default class Collection {
  static isEmpty(obj) {
    if (!obj && obj !== 0) {
      return true;
    } else if (!obj.length) {
      return true;
    } else if (
      obj.length &&
      Object.prototype.toString.call(obj) === '[object Array]'
    ) {
      for (const o of obj) {
        if (typeof o === 'string' && o.trim() === '') {
        } else {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
