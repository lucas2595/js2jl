# js2jl
This is a basic project to convert plain javaScript to [`json-logic`](https://github.com/jwadhams/json-logic-js) notation.

The user can input a `data` and a `logic` using [infix notation](https://en.wikipedia.org/wiki/Infix_notation). Then, the infix `logic` is converted to a proper `JSON` and display it for the user. The result of the `logic` being applied to the `data` is also shown for debuging reasons. Below are some screenshots:

1) Simple multiplication:

![image](https://user-images.githubusercontent.com/24466413/59210850-e24aaf00-8b84-11e9-8ada-dd737d39a6ae.png)


2) Maps the [1,2,3] array to [2,4,6], filters to get only [4,6] and reduces it to (6*(4*(0+1)+1))

![image](https://user-images.githubusercontent.com/24466413/59211130-816fa680-8b85-11e9-871a-c89101c434d5.png)

Currently supported operators (ordered by precedency):

*  `*`, `/`, `%`;
*  `+`, `-`, `cat`, `in`, `substr`;
*  `===`, `!==`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `or`, `and`;
*  `?` followed by `:`, `filter`, `map`, `reduce` followed by `initial`, `method` followed by `arguments`.

Only `if`, `reduce` and `method` are currently supporting three arguments. The rest uses only 2. Arrays, objects, and strings (but only strings that don't contain any spaces for now) are being parsed; the rest is treated as variables. E.g:

![image](https://user-images.githubusercontent.com/24466413/59211714-ea0b5300-8b86-11e9-8a31-b95915bd1642.png)

![image](https://user-images.githubusercontent.com/24466413/59211979-a107ce80-8b87-11e9-960e-2762d9e01049.png)
