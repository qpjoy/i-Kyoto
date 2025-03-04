const authenticator = require("authenticator");

const formattedKey = authenticator.generateKey();
// "acqo ua72 d3yf a4e5 uorx ztkh j2xl 3wiz"

const formattedToken = authenticator.generateToken("B35ABZUCZMXQTQWPAKRH5KFI3YGS2I6R");
// "957 124"

const a = authenticator.verifyToken(formattedKey, formattedToken);
// { delta: 0 }

const b = authenticator.verifyToken(formattedKey, "000 000");
// null

const c = authenticator.generateTotpUri(formattedKey, "15150121121@126.com", "Qpjoy", "SHA1", 6, 30);
console.log(formattedKey, formattedToken, a, b, c);
