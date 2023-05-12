/**
 * focusNextInput
 * Find then focus on next Input
 */
export const focusNextInput = (currentInputId: string) => {
  const inputs = document.getElementsByTagName("input");
  if (inputs.length < 2) return;
  let nextInput;
  for (let i = 0; i < inputs.length; i += 1) {
    if (inputs[i].id === currentInputId) {
      // eslint-disable-next-line prefer-destructuring
      if (i === inputs.length - 1) nextInput = inputs[0];
      else nextInput = inputs[i + 1];
      break;
    }
  }
  if (nextInput?.focus) nextInput.focus();
};
