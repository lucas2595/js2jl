# js2jl
This is a basic project to convert plain javaScript to [`json-logic`](https://github.com/jwadhams/json-logic-js) notation.

Installation:

```
npm install js2jl
```

or with yarn

```
yarn add js2jl
```

Usage:

```javascript
import js2jl from 'js2jl'

const infix = "A + B - 2"

const logic = js2jl(infix) 
//  logic contains:
//  {
//      "-": [
//          {
//              "+": [
//                  {
//                      "var": "A"
//                  },
//                  {
//                      "var": "B"
//                  }
//              ]
//          },
//          2
//      ]
//  }

```

Currently supported operators (ordered by precedency):

*  `*`, `/`, `%`;
*  `+`, `-`, `cat`, `in`, `substr`;
*  `===`, `!==`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `or`, `and`;
*  `?` followed by `:`, `filter`, `map`, `reduce` followed by `initial`, `method` followed by `arguments`.

Only `if`, `reduce` and `method` are currently supporting three arguments; the rest uses only two.

Arrays, objects, and strings are being parsed (but only strings that don't contain any spaces for now); anything else is treated as a variable.

Important:
1. Operators and operands **must** be separated by a space.
2. to make `{"var": ""}` use two spaces one after another.


[Here's a sandbox](https://codesandbox.io/embed/wandering-lake-cil4d?fontsize=14&hidenavigation=1) with this project running
