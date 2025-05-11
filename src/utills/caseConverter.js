import { snakeCase, mapKeys } from 'lodash';

export const convertToSnakeCase = (obj) => {
  return mapKeys(obj, (_, key) => snakeCase(key));
};