# destructuring-property-newline

This rule enforces style of linebreaks before/after parens of arrow functions bodies.

## Options

This rule accepts an object option with properties below:

- `minItems` requires linebreak if the number of properties is greater than the given integer. Default is `2`.
- `allowAllOnSameLine` allows all properties can be on the same line. Default is `false`.

## Examples

### With default options

Incorrect:

```js
/* eslint mayaka/destructuring-property-newline: 2 */

import { a, b, c } from 'mayaka'

const { d, e, f } = {}

export { d, e, f }
```

Correct:

```js
/* eslint mayaka/destructuring-property-newline: 2 */

import { a } from 'mayaka'
import { b, c } from 'mayaka'
import {
  d,
  e,
  f,
} from 'mayaka'

const {
  g,
  h,
  i,
} = {}

export {
  d,
  e,
  f,
}
```

### With `minItems` option

Incorrect:

```js
/* eslint mayaka/destructuring-property-newline: [2, { minItems: 4 }] */

import { a, b, c, d, e } from 'mayaka'

const { f, g, h, i, j } = {}

export { f, g, h, i, j }
```

Correct:

```js
/* eslint mayaka/destructuring-property-newline: [2, { minItems: 4 }] */

import { a, b, c, d } from 'mayaka'
import {
  e,
  f,
  g,
  h,
  i,
} from 'mayaka'

const {
  j,
  k,
  l,
  m,
  n,
} = {}

export {
  j,
  k,
  l,
  m,
  n,
}
```

### With `allowAllOnSameLine` option

Incorrect:

```js
/* eslint mayaka/destructuring-property-newline: [2, { allowAllOnSameLine: true }] */

import {
  a, b, c,
  d, e
} from 'mayaka'

const {
  f, g,
  h, i,
  j
} = {}

export {
  f, g,
  h, i,
  j
}
```

Correct:

```js
/* eslint mayaka/destructuring-property-newline: [2, { allowAllOnSameLine: true }] */

import { a, b, c, d } from 'mayaka'
import {
  e,
  f,
  g,
  h,
  i,
} from 'mayaka'

const { j, k, l, m, n, } = {}

export {
  j,
  k,
  l,
  m,
  n,
}
```
