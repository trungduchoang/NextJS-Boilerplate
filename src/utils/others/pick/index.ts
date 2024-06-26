/**
 * Create an object composed of the picked object properties
 * @param  {T extends Record<string, any>} obj
 * @param  {K extends Extract<keyof T, string>} keys
 * @returns {Partial<Pick<T, K>>}
 */
export const pick = <T extends TObject, K extends Extract<keyof T, string>>(
  obj: T,
  keys: readonly K[],
): Partial<Pick<T, K>> =>
  keys.reduce<Partial<Pick<T, K>>>(
    (result: Partial<Pick<T, K>>, key: K): Partial<Pick<T, K>> => {
      if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
        // Use mutating for better performance
        // eslint-disable-next-line no-param-reassign
        result[key] = obj[key];
      }

      return result;
    },
    {},
  );
