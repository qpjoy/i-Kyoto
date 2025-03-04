import config from 'config';
import * as jwt from 'jsonwebtoken';

const secretKey = config.jwtPrivateKey;

const decodeJWT = ({ token }) => {
  return jwt.verify(token, secretKey, function (err, decoded) {
    if (err) throw new Error('Authentication error');
    return decoded;
  });
};
export default decodeJWT;
