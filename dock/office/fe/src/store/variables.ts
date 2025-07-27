const isDev = process.env.NODE_ENV === "development" ? true : false;
// const isHost = process.env.NODE_ENV === "host" ? true : false;
// export const url = isDev ? "http://localhost:9056/v2" : "https://www.memoscard.com/push-code-v2";
// export const url = isDev ? "http://localhost:9101/api" : "http://www.memoscard.com:9101/api";
export const api = isDev ? "http://localhost:9101/api" : "http://43.246.210.144:9101/api";
