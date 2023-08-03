type BinaryTreeNodeType<T> = {
  value: T;
  left: BinaryTreeNodeType<T> | null;
  right: BinaryTreeNodeType<T> | null;
};

export default BinaryTreeNodeType;
