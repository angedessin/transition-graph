import axios from 'redaxios';

/**
 * APIリクエストを行うためのリポジトリを取得する
 * @param params
 */
export const getRepository = <T>(params: T) =>
  axios.create({
    baseURL: process.env.PUBLIC_API_URL as string,
    headers: {
      'content-type': 'application/json',
      'X-API-KEY': process.env.PUBLIC_X_API_KEY as string,
    },
    ...params,
  });
