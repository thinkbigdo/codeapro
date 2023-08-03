declare class GenericHeap<T> {
  private heap: Array<T>;
  private entryMap: Record<number, number>;
  private comparator: (a: T, b: T) => boolean;
  private getEntryIndex: (entry: T) => number;
  constructor({
    array,
    comparator = (a, b) => a < b,
    getEntryIndex = (entry) => entry as number,
  }: {
    array: Array<T>;
    comparator: (a: T, b: T) => boolean;
    getEntryIndex: (entry: T) => number;
  }): void;
  public BuildHeap(): void;
  public SiftDown(currentI: number): void;
  public SiftUp(currentI: number): void;
  public update(entryIndex: number, handler: (entry: T) => T);
  public peek(): T;
  public remove(): T;
  public insert(value: T);
  public isEmpty(): boolean;
  private swap(a: number, b: number): void;
}
declare function generateSingleLinkedList<T>(array: Array<T>);

export { GenericHeap, generateSingleLinkedList };
