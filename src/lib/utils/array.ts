/**
 * Finds the index of the first element in the array that satisfies the provided testing function. If no elements satisfy the testing function, an error is thrown.
 * @param array - The array to search through.
 * @param callbackFn - A function to execute on each value in the array, taking three arguments: the current element, the index of the current element, and the array itself.
 * @returns The index of the first element in the array that satisfies the provided testing function.
 */
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
