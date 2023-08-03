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

export { generateSingleLinkedList };
