function js2jl(infix) {
  let ops = {
    "*": 4,
    "/": 4,
    "%": 4,
    "+": 3,
    "-": 3,
    cat: 3,
    in: 3,
    substr: 3,
    "===": 2,
    "!==": 2,
    "!=": 2,
    "==": 2,
    "<": 2,
    ">": 2,
    "<=": 2,
    ">=": 2,
    or: 2,
    and: 2,
    "?": 1,
    ":": 1,
    filter: 1,
    map: 1,
    reduce: 1,
    initial: 1,
    method: 1,
    arguments: 1
  };
  let peek = a => a[a.length - 1];
  let stack = [];
  return infix
    .split(" ")
    .reduce((output, token) => {
      if (token in ops) {
        while (peek(stack) in ops && ops[token] <= ops[peek(stack)])
          output.push(stack.pop());
        stack.push(token);
      } else if (token === "(") {
        stack.push(token);
      } else if (token === ")") {
        while (peek(stack) !== "(") output.push(stack.pop());
        stack.pop();
      } else {
        output.push(token);
      }
      return output;
    }, [])
    .concat(stack.reverse())
    .reduce(
      (acc, val) => {
        if (!(val in ops)) {
          if (!isNaN(parseFloat(val))) {
            acc.push(parseFloat(val));
          } else if (
            val !== undefined &&
            (val.split(/"/).length === 3 || val.split(/'/).length === 3)
          ) {
            acc.push(val.replace(/"/g, ""));
          } else if (
            val !== undefined &&
            ((val[0] === "[" && val[val.length - 1] === "]") ||
              (val[0] === "{" && val[val.length - 1] === "}"))
          ) {
            try {
              acc.push(JSON.parse(val));
            } catch (err) {
              acc.push({ var: val });
            }
          } else {
            acc.push({ var: val });
          }
        } else if (val === ":") {
          let a = acc.pop();
          let b = acc.pop();
          if (b && b["?"]) acc = [...acc, { if: [b["?"][0], b["?"][1], a] }];
        } else if (val === "initial") {
          let a = acc.pop();
          let b = acc.pop();
          if (b && b["reduce"])
            acc = [...acc, { reduce: [b["reduce"][0], b["reduce"][1], a] }];
        } else if (val === "arguments") {
          let a = acc.pop();
          let b = acc.pop();
          if (b && b["method"])
            acc = [...acc, { method: [b["method"][0], b["method"][1], a] }];
        } else {
          let a = acc.pop();
          let b = acc.pop();
          acc = [...acc, { [val]: [b, a] }];
        }
        return acc;
      },
      [{}]
    )
    .pop();
}

module.exports = js2jl;
