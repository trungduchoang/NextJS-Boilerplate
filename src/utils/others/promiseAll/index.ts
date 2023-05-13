/**
 * promiseAll - ignore promiseAll maximum promises
 * @param promises
 * @param then - onSuccess callback
 */
export function promiseAll<TResponseType>(
  promises: Promise<any>[],
  { then }: { then: (props: any) => TResponseType },
) {
  return Promise.all(promises).then(then);
}
