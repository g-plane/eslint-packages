# arrow-body-parens-linebreak

This rule enforces the style of linebreaks before/after parens of arrow functions bodies.

## Options

This rule has three options:

- `consistent` (default) requires consistent style in one arrow function.
- `always` requires linebreak between parens and arrow function body.
- `never` disallows linebreak between parens and arrow function body.

## Examples

### With `consistent` option

Incorrect:

```js
/* eslint mayaka/arrow-body-parens-linebreak: 2 */
const f1 = mayaka => (
  satoshi)

const f2 = mayaka => (satoshi
)
```

Correct:

```js
/* eslint mayaka/arrow-body-parens-linebreak: 2 */
const f1 = mayaka => (satoshi)

const f2 = mayaka => (
  satoshi
)
```

### With `always` option

Incorrect:

```js
/* eslint mayaka/arrow-body-parens-linebreak: [2, 'always'] */
const f = mayaka => (satoshi)
```

Correct:

```js
/* eslint mayaka/arrow-body-parens-linebreak: [2, 'always'] */
const f = mayaka => (
  satoshi
)
```

### With `never` option

Incorrect:

```js
/* eslint mayaka/arrow-body-parens-linebreak: [2, 'never'] */
const f = mayaka => (
  satoshi
)
```

Correct:

```js
/* eslint mayaka/arrow-body-parens-linebreak: [2, 'never'] */
const f = mayaka => (satoshi)
```
