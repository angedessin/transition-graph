/**
 * URLパラメータを取得
 * @param {string} query
 * @returns {{[p: string]: string}}
 */
export const getUrlParams = (query: string): { [key: string]: string } =>
  [...new URLSearchParams(query).entries()].reduce(
    (obj, e) => ({ ...obj, [e[0]]: e[1] }),
    {}
  );

/**
 * オブジェクトからdata属性を取得
 * @param {{[p: string]: any}} props
 * @returns {{[p: string]: string}}
 */
export const getDataAttribute = (props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}): { [key: string]: string } => {
  const dataKeys: string[] = Object.keys(props).filter((key: string) =>
    key.includes('data-')
  );
  const dataAttributes: { [key: string]: string } = {};
  for (let i = 0; i < dataKeys.length; i += 1) {
    const key: string | undefined = dataKeys[i];
    if (typeof key !== 'undefined') {
      dataAttributes[key] = props[key];
    }
  }

  return dataAttributes;
};

/**
 * ms秒またせたあとに関数を実行
 * @param ms
 */
export const sleep = (ms: number): Promise<number> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * ランダムなカラーコードを取得
 */
export const getColor = (): string => {
  const ratio = 200;
  const r: number = Math.floor(Math.random() * ratio);
  const g: number = Math.floor(Math.random() * ratio);
  const b: number = Math.floor(Math.random() * ratio);
  return `rgb(${r},${g},${b})`;
};
