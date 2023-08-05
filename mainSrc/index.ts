class GenericHeap<T> {
  heap: Array<T>;
  entryMap: Record<number, number>;
  comparator: (a: T, b: T) => boolean;
  getEntryIndex: (entry: T) => number;
  length: number;
  useEntryMap: boolean;

  constructor({
    array,
    comparator = (a, b) => a < b,
    getEntryIndex = (entry) => entry as number,
    useEntryMap = false,
  }: {
    array: Array<T>;
    comparator: (a: T, b: T) => boolean;
    getEntryIndex?: (entry: T) => number;
    useEntryMap: boolean;
  }) {
    if (useEntryMap) {
      this.entryMap = array.reduce(
        (acc, _, index) => {
          acc[index] = index;
          return acc;
        },
        {} as Record<number, number>,
      );
    } else {
      this.entryMap = {};
    }
    this.length = array.length;
    this.heap = array;
    this.comparator = comparator;
    this.getEntryIndex = getEntryIndex;
    this.useEntryMap = useEntryMap;
    this.buildHeap();
  }

  buildHeap() {
    const midI = Math.floor((this.length - 2) / 2);
    for (let currentI = midI; currentI >= 0; currentI--) {
      this.siftDown(currentI);
    }
  }

  siftDown(currentI = 0) {
    const endI = this.length - 1;
    let childOneI = currentI * 2 + 1;
    while (childOneI <= endI) {
      let smallestChildI = childOneI;
      const childTwoI = childOneI + 1 <= endI ? childOneI + 1 : -1;
      if (
        childTwoI !== -1 &&
        this.comparator(this.heap[childTwoI], this.heap[childOneI])
      ) {
        smallestChildI = childTwoI;
      }
      if (this.comparator(this.heap[smallestChildI], this.heap[currentI])) {
        this.swap(smallestChildI, currentI);
        currentI = smallestChildI;
        childOneI = currentI * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentI = this.length - 1) {
    let parentI = Math.floor((currentI - 1) / 2);
    while (
      currentI > 0 &&
      this.comparator(this.heap[currentI], this.heap[parentI])
    ) {
      this.swap(currentI, parentI);
      currentI = parentI;
      parentI = Math.floor((currentI - 1) / 2);
    }
  }

  update(entryIndex: number, handler: (entry: T) => T) {
    if (this.useEntryMap) {
      this.heap[this.entryMap[entryIndex]] = handler(
        this.heap[this.entryMap[entryIndex]],
      );
    } else {
      this.heap[entryIndex] = handler(this.heap[entryIndex]);
    }
    this.siftUp(entryIndex);
  }

  peek() {
    return this.heap[0];
  }

  removeToEnd() {
    if (this.isEmpty()) {
      return;
    }
    this.swap(0, this.length - 1);
    const removedValue: T = this.heap[this.length - 1] as T;
    if (this.useEntryMap) {
      delete this.entryMap[this.getEntryIndex(removedValue)];
    }
    this.length -= 1;
    this.siftDown();
    return removedValue;
  }

  remove() {
    if (this.isEmpty()) {
      return;
    }
    this.swap(0, this.length - 1);
    const removedValue: T = this.heap.pop() as T;
    if (this.useEntryMap) {
      delete this.entryMap[this.getEntryIndex(removedValue)];
    }
    this.length -= 1;
    this.siftDown();
    return removedValue;
  }

  insert(value: T) {
    this.heap.push(value);
    if (this.useEntryMap) {
      this.entryMap[this.getEntryIndex(value)] = this.length - 1;
    }
    this.length += 1;
    this.siftUp();
  }

  isEmpty() {
    return this.length === 0;
  }

  getLength() {
    return this.length;
  }

  swap(a: number, b: number) {
    if (this.useEntryMap) {
      this.entryMap[this.getEntryIndex(this.heap[a])] = b;
      this.entryMap[this.getEntryIndex(this.heap[b])] = a;
    }
    const tmp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = tmp;
  }
}

function generateSingleLinkedList<T>(array: Array<T>) {
  let head: SingleLinkedListType = null;
  let node: SingleLinkedListType = null;
  for (let i = 0; i < array.length; i++) {
    const entryNode = { value: array[i], next: null };
    if (!node) {
      node = entryNode;
      head = node;
    } else {
      node.next = entryNode;
      node = entryNode;
    }
  }
  return head;
}

export { GenericHeap, generateSingleLinkedList };
