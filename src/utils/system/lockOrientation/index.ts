/**
 * lockOrientation
 * @param direction
 * @description Only working by a user gesture
 */
export const lockOrientation = async (direction: OrientationLockType) => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
    await window.screen.orientation.lock(direction);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Orientation lock failed:", error);
  }
};

/**
 * unlockOrientation
 */
export const unlockOrientation = () => {
  window.screen.orientation.unlock();
};
