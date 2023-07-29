type TreeNodeType<T> = {
  value: T;
  children: Array<TreeNodeType<T>>;
};

export default TreeNodeType;
