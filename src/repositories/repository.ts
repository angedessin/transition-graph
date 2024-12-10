import axios from 'redaxios';

/**
 * APIリクエストを行うためのリポジトリを取得する
 * @param params
 */
export const getRepository = <T>(params: T) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY as string,
      'Content-Type': 'application/json',
    },
    ...params,
  });
