/**
 * Updates the items, if any exist, otherwise it adds the items and returns the updated items list. This function uses
 * the `key` as the index.
 * @param {Type extends Record<string, unknown>} items - A list of items to be added to/updated.
 * @param {Type extends Record<string, unknown} upsertItems - The items to add or update.
 * @param {string} key - The key to use as the indexer.
 * @returns {Type extends Record<'id', string>} A new list with the items updated or added.
 */
export default function upsertItemsByKey<Type = Record<string, unknown>>(
  items: Type[],
  upsertItems: Type[],
  key: keyof Type
): Type[] {
  const itemsToAdd = upsertItems.filter((item) => !items.some((value) => value[key] === item[key]));
  const updatedItems = items.map((item) => upsertItems.find((value) => value[key] === item[key]) || item);

  return [...updatedItems, ...itemsToAdd];
}
