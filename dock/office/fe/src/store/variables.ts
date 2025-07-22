const isDev = process.env.NODE_ENV === "development" ? true : false;
// export const url = isDev ? "http://localhost:9056/v2" : "https://www.memoscard.com/push-code-v2";
export const url = isDev ? "http://localhost:9101/api" : "http://www.memoscard.com:9101/api";
