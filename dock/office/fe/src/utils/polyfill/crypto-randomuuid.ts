declare global {
  interface Window {
    crypto: any; // 'Crypto' is the standard Web Crypto API interface
  }
}

// crypto-randomuuid-polyfill.js
if (!window.crypto || !window.crypto.randomUUID) {
  if (window.crypto && window.crypto.getRandomValues) {
    console.warn("Polyfilling window.crypto.randomUUID() using getRandomValues.");
    window.crypto.randomUUID = function () {
      // From RFC 4122, section 4.4.
      // The version 4 UUID is a UUID having the form XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX
      // where X is any hexadecimal digit and Y is one of 8, 9, A, or B.

      // Generate 16 random bytes
      const randomBytes = new Uint8Array(16);
      window.crypto.getRandomValues(randomBytes);

      // Set the version (4) and variant (RFC 4122) bits
      // byte 6: version bits 0100
      randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
      // byte 8: variant bits 10xx
      randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;

      // Convert bytes to hex string and format
      let uuid = "";
      for (let i = 0; i < 16; i++) {
        const byte = randomBytes[i];
        const hex = (byte < 16 ? "0" : "") + byte.toString(16);
        if (i === 4 || i === 6 || i === 8 || i === 10) {
          uuid += "-";
        }
        uuid += hex;
      }
      return uuid;
    };
  } else {
    // Fallback if even getRandomValues is not available (very old/uncommon case)
    // This is NOT cryptographically secure and should be used with caution!
    console.warn("window.crypto.getRandomValues not available. Using insecure fallback for UUID.");
    window.crypto = window.crypto || {}; // Ensure crypto object exists
    window.crypto.randomUUID = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };
  }
}

// Then you can use it:
// const myUuid = crypto.randomUUID();
// console.log(myUuid);
