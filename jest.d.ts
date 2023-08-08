import "jest-extended";

export {};

type solutionType = {
  bigOs: () => Record<string, { time: string; space: string }>;
  solns: Record<string, (T, U?, V?, W?) => S>;
  bigO: () => { time: string; space: string };
  run: (T, U?, V?, W?) => S;
  default: (T, U?, V?, W?) => S;
};

declare global {
  var soln: solutionType;
  namespace jest {
    interface Matchers<R, T = {}> {
      toBeOneOf(expected: { time: string; space: string }[]): R;
      toHaveMixedArrayWithTargetAtEnd(
        expected: Array<number>,
        target: number,
      ): R;
      toIncludeSameMemberArrays(expected: Array<Array<T>>): R;
    }
  }
}
