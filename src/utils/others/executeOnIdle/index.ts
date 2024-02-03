/**
 * executeOnIdle
 * @description Execute callback function only when browser is idle
 * If Browser not support for check idle, execute immediately
 */
export const executeOnIdle = (callback: () => void) => {
  const execute = () => setTimeout(callback, 10);
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => execute());
  } else {
    execute();
  }
};
