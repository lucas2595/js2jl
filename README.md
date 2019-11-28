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

Only `if`, `reduce` and `method` are currently supporting three arguments. The rest uses only 2. Arrays, objects, and strings (but only strings that don't contain any spaces for now) are being parsed; the rest is treated as variables.
