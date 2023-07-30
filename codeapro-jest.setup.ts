import * as matchers from "jest-extended";

expect.extend(matchers);

function toBeOneOf(value, choices) {
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

expect.extend({
  toBeOneOf,
});

function isClass(asset) {
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
  global.soln = await import("./challenges/" + process.env.SOLUTION_FILE);
  if (isClass(global.soln.default) || typeof global.soln.default === "object") {
    global.soln.bigOs = global.soln.bigO;
    global.soln.solns = global.soln.default;
  } else {
    global.soln.run = global.soln.default;
  }
});
