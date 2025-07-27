const isHost = process.env.NODE_ENV === 'host' ? true : false;
export const jwtSecret = 'secret123';
export const jwtKey = 'jwt-key';
export const api = isHost
  ? 'http://localhost:9101/api'
  : 'http://43.246.210.144:9101/api';
