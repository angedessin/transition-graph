// HTTPステータス用の設定
export const HTTP_STATUS: {
  BAD_REQUEST: number;
  CREATED: number;
  NOT_FOUND: number;
  SUCCESS: number;
  UNPROCESSABLE_ENTITY: number;
} = {
  BAD_REQUEST: 400,
  CREATED: 201,
  SUCCESS: 200,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
};
