import "jest-extended";

export {};

type solutionType = {
  bigOs: () => Record<string, { time: string; space: string }>;
  solns: Record<string, (T, V?) => number | boolean | string | Array<any>>;
  bigO: () => { time: string; space: string };
  run: (T, V?) => number | boolean | string | Array<any>;
  default: (T, V?) => number | boolean | string | Array<any>;
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
      toIncludeSameMemberArrays(expected: Array<Array<number>>): R;
    }
  }
}
