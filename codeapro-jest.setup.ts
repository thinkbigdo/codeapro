import * as matchers from "jest-extended";
import { join } from "node:path";

expect.extend(matchers);

function toBeOneOf(
  value: { time: string; space: string },
  choices: Array<{ time: string; space: string }>,
) {
  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    if (value.time === choice.time && value.space === choice.space) {
      return {
        message: () => "Big 0",
        pass: true,
      };
    }
  }
  return {
    message: () => "Big 0",
    pass: false,
  };
}

function toIncludeSameMemberArrays(
  value: Array<Array<number>>,
  expected: Array<Array<number>>,
  target: number,
) {
  if (value.length !== expected.length) {
    return {
      message: () => "Input length does not match expected length",
      pass: false,
    };
  }

  function sort(arrays: Array<Array<number>>): Array<Array<number>> {
    for (let i = 0; i < arrays.length; i++) {
      arrays[i].sort((a, b) => a - b);
    }
    return arrays;
  }

  sort(value);
  sort(expected);

  try {
    expect(value).toIncludeSameMembers(expected);
  } catch (e: any) {
    return {
      message: () => e.message,
      pass: false,
    };
  }

  return {
    message: () => "Mission complete",
    pass: true,
  };
}

expect.extend({
  toBeOneOf,
  toIncludeSameMemberArrays,
});

function isClass(asset: unknown) {
  const string_match = "function";

  const is_fn = !!(typeof asset === string_match);

  if (!is_fn) {
    return false;
  } else {
    const has_constructor =
      is_fn &&
      !!(
        asset.prototype &&
        asset.prototype.constructor &&
        asset.prototype.constructor === asset
      );

    const code = !asset.toString ? "" : asset.toString();

    if (has_constructor && !code.startsWith(string_match)) {
      return true;
    }

    if (has_constructor && code.startsWith(string_match + "(")) {
      return false;
    }

    const [keyword, name] = code.split(" ");

    if (
      name &&
      name[0] &&
      name[0].toLowerCase &&
      name[0].toLowerCase() != name[0]
    ) {
      return true;
    } else {
      return false;
    }
  }
}

beforeAll(async () => {
  global.soln = await import(
    join(process.cwd(), "challenges", process.env.SOLUTION_FILE!)
  );
  if (isClass(global.soln.default) || typeof global.soln.default === "object") {
    global.soln.bigOs = global.soln.bigO;
    global.soln.solns = global.soln.default;
  } else {
    global.soln.run = global.soln.default;
  }
});
