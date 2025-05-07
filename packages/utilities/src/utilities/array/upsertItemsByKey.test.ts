import { describe, it, expect } from 'vitest';

// utils
import upsertItemsByKey from './upsertItemsByKey';

interface TTestType {
  id: string;
  name: string;
}

describe('upsertItemsByKey()', () => {
  it('should update and add items based on the "id" key', () => {
    const items: TTestType[] = [{ id: '1', name: 'Item 1' }];
    const upsertItems: TTestType[] = [
      { id: '1', name: 'Updated Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    const result = upsertItemsByKey(items, upsertItems, 'id');

    expect(result).toEqual([
      { id: '1', name: 'Updated Item 1' },
      { id: '2', name: 'Item 2' },
    ]);
  });

  it('should update and add items based on the "address" key', () => {
    const items = [{ address: 'A123', price: 10 }];
    const upsertItems = [
      { address: 'A123', price: 15 },
      { address: 'B456', price: 20 },
    ];
    const result = upsertItemsByKey(items, upsertItems, 'address');

    expect(result).toEqual([
      { address: 'A123', price: 15 },
      { address: 'B456', price: 20 },
    ]);
  });

  it('should handle empty initial items list', () => {
    const items: TTestType[] = [];
    const upsertItems: TTestType[] = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    const result = upsertItemsByKey(items, upsertItems, 'id');

    expect(result).toEqual(upsertItems);
  });

  it('should handle empty upsert items list', () => {
    const items: TTestType[] = [{ id: '1', name: 'Item 1' }];
    const upsertItems: TTestType[] = [];
    const result = upsertItemsByKey(items, upsertItems, 'id');

    expect(result).toEqual(items);
  });

  it('should work with numeric keys', () => {
    const items = [{ code: 101, value: 'Old Value' }];
    const upsertItems = [
      { code: 101, value: 'New Value' },
      { code: 102, value: 'Another Value' },
    ];
    const result = upsertItemsByKey(items, upsertItems, 'code');

    expect(result).toEqual([
      { code: 101, value: 'New Value' },
      { code: 102, value: 'Another Value' },
    ]);
  });
});
