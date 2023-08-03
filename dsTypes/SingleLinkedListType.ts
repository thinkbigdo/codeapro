type SingleLinkedListType<T> = {
  value: T;
  next: SingleLinkedListType<T> | null;
};

export default SingleLinkedListType;
