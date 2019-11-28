function js2jl(infix) {
  let ops = {
    not: { precedency: 5, single: true },
    "*": { precedency: 4 },
    "/": { precedency: 4 },
    "%": { precedency: 4 },
    "+": { precedency: 3 },
    "-": { precedency: 3 },
    cat: { precedency: 3 },
    in: { precedency: 3 },
    substr: { precedency: 3 },
    "===": { precedency: 2 },
    "!==": { precedency: 2 },
    "!=": { precedency: 2 },
    "==": { precedency: 2 },
    "<": { precedency: 2 },
    ">": { precedency: 2 },
    "<=": { precedency: 2 },
    ">=": { precedency: 2 },
    or: { precedency: 2 },
    and: { precedency: 2 },
    filter: { precedency: 1 },
    map: { precedency: 1 },
    "?": { precedency: 1 },
    reduce: { precedency: 1 },
    method: { precedency: 1 },
    ":": { precedency: 1, helper: "?", key: "if" },
    initial: { precedency: 1, helper: "reduce", key: "reduce" },
    arguments: { precedency: 1, helper: "method", key: "method" }
  };

  let helped = Object.entries(ops)
    .filter(a => a[1].helper)
    .map(a => a[0]);
  let single = Object.entries(ops)
    .filter(a => a[1].single)
    .map(a => a[0]);

  let peek = a => a[a.length - 1];
  let stack = [];
  return infix
    .split(" ")
    .reduce((output, token) => {
      if (token in ops) {
        while (
          peek(stack) in ops &&
          ops[token].precedency <= ops[peek(stack)].precedency
        )
          output.push(stack.pop());
        stack.push(token);
      } else if (token === "(") {
        stack.push(token);
      } else if (token === ")") {
        while (peek(stack) !== "(" && stack.length > 0) {
          output.push(stack.pop());
        }
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
        } else if (helped.includes(val)) {
          // Three arguments
          let a = acc.pop();
          let b = acc.pop();
          if (b && b[ops[val].helper])
            acc = [
              ...acc,
              {
                [ops[val].key]: [
                  b[ops[val].helper][0],
                  b[ops[val].helper][1],
                  a
                ]
              }
            ];
        } else if (single.includes(val)) {
          // Single argument
          let a = acc.pop();
          acc = [...acc, { [val]: a }];
        } else {
          // Two arguments
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
