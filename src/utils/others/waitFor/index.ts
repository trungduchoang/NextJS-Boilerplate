type TProps = {
  seconds: number;
};
/**
 * waitFor
 * @param seconds
 */
export async function waitFor({ seconds }: TProps) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
