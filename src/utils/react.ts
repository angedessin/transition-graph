import { createElement } from 'react';

/**
 * \nがある場合にbrタグに置き換える処理
 * @param txt
 */

export const nl2br = (txt: string) => {
  const regex = /(\n)/g;

  // \nに引っかかった場合のみbrタグを追加する
  return txt.split(regex).map((line: string, i: number) => {
    if (line.match(regex)) {
      const key = `value-${i}`;
      return createElement('br', { key });
    }

    return line;
  });
};

/**
 * ReactにHTML要素として入れる処理
 * @param html
 */
export const generateHtml: (html: string) => { __html: string } = (
  html: string
) => ({ __html: html });
