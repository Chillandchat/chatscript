/**
 * This is the insert function this function can be used to insert an element into an array.
 *
 * @param {Array<unknown>} array The array to add it to.
 * @param {number} index The index to insert the elements to.
 * @param {Array<unknown>} elements The elements to insert at index location.
 * @returns {Array<unknown>} Returns the inserted array.
 */

const insert = (
  array: Array<unknown>,
  index: number,
  elements: Array<unknown>
): Array<unknown> => {
  array.splice(index, 0, ...elements);
  return array;
};

export default insert;
