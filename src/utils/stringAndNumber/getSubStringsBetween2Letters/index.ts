/**
 * getSubStringsBetween2Letters
 * @param {string} input
 * @param {[string, string]} letters
 * @example
 * getSubStringsBetween2Letters('/a/:b/c/:d/', [':', '/']) -> ['b', 'd']
 * getSubStringsBetween2Letters('/a/:b/c/:d', [':', '/']) -> ['b']
 * const str = '/a/:b/c/:d';
 * getSubStringsBetween2Letters(`${str}/`, [':', '/']) -> ['b', 'd']
 */
export const getSubStringsBetween2Letters = (
  input: string,
  letters: [string, string],
) => {
  const result: string[] = [];
  `${input || ""}`.split(letters[1]).forEach((subString) => {
    if (subString[0] === letters[0]) result.push(subString.substring(1));
  });
  if (input[input.length - 1] !== letters[1]) result.pop();
  return result;
};
