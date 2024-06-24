import camelcase from "camelcase";

/**
 * toCamelCase
 */
export const toCamelCase = (input: string) => camelcase(input || "");

/**
 * toPascalCase
 */
export const toPascalCase = (input: string) =>
  camelcase(input || "", { pascalCase: true });

// @better-do: toKebabCase, toSnakeCase, toUpperSnakeCase maybe not perfect now
// maybe should use npmjs lib: kebabcase, snakecase
/**
 * toKebabCase
 */
export const toKebabCase = (input: string) => {
  const result = (input || "").replace(
    /[A-Z]/g,
    (letter) => `-${letter.toLowerCase()}`,
  );
  if (result[0] === "-") return result.slice(1);
  return result;
};

/**
 * toSnakeCase
 */
export const toSnakeCase = (input: string) => {
  const result = (input || "").replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`,
  );
  if (result[0] === "_") return result.slice(1);
  return result;
};

/**
 * toUpperSnakeCase
 * @description updateAppInfo -> UPDATE_APP_INFO
 */
export const toUpperSnakeCase = (input: string) => {
  const result = (input || "")
    .replace(/[A-Z]/g, (letter) => `_${letter}`)
    .toUpperCase();
  if (result[0] === "_") return result.slice(1);
  return result;
};
