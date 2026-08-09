export function mustFindIndex<T>(
  array: readonly T[] | T[],
  callbackFn: (value: T, index: number, array: readonly T[] | T[]) => unknown,
): number {
  const index = array.findIndex((element, index, array) => callbackFn(element, index, array));
  if (index === -1) {
    throw new Error(`Element not found in array: ${JSON.stringify(array)}`);
  }

  return index;
}
