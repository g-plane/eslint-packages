import * as eslint from 'eslint'
import rule from '../../src/rules/destructuring-property-newline'

const ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
})

ruleTester.run('destructuring-property-newline', rule, {
  valid: [
    'const {} = mayaka',
    'const {\n} = mayaka',
    'const { ibara } = mayaka',
    'const { i, bara } = mayaka',
    {
      code: 'const { i, ba, ra } = mayaka',
      options: [{ allowAllOnSameLine: true }],
    },
    {
      code: 'const { a, b, c, d, e } = {}',
      options: [{ minItems: 5 }],
    },
    'import {} from "mayaka"',
    'import {\n} from "mayaka"',
    'import { ibara } from "mayaka"',
    'import { i, bara } from "mayaka"',
    {
      code: 'import { i, ba, ra } from "mayaka"',
      options: [{ allowAllOnSameLine: true }],
    },
    {
      code: 'import { a, b, c, d, e } from "mayaka"',
      options: [{ minItems: 5 }],
    },
    'export {}',
    'export {\n}',
    'let mayaka; export { mayaka }',
    'let ma, yaka; export { ma, yaka }',
    {
      code: 'let ma, ya, ka; export { ma, ya, ka }',
      options: [{ allowAllOnSameLine: true }],
    },
    {
      code: 'let a, b, c, d, e; export { a, b, c, d, e }',
      options: [{ minItems: 5 }],
    },
  ],
  invalid: [
    {
      code: 'const { i, ba, ra } = mayaka',
      output: 'const { i, \nba, \nra } = mayaka',
      errors: [
        {
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 12,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 16,
          messageId: 'missingNewLine',
        },
      ],
    },
    {
      code: 'const { i, \nba, ra } = mayaka',
      output: 'const { i, \nba, \nra } = mayaka',
      errors: [
        {
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
          messageId: 'missingNewLine',
        },
      ],
    },
    {
      code: 'const { i, \nba, ra } = mayaka',
      options: [{ allowAllOnSameLine: true }],
      output: 'const { i, \nba, \nra } = mayaka',
      errors: [
        {
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
          messageId: 'allowSameLine',
        },
      ],
    },
    {
      code: 'const { a, b, c, d, e } = {}',
      options: [{ minItems: 4 }],
      output: 'const { a, \nb, \nc, \nd, \ne } = {}',
      errors: [
        {
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 12,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 15,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 18,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 19,
          endLine: 1,
          endColumn: 21,
          messageId: 'missingNewLine',
        },
      ],
    },
    {
      code: 'import { i, ba, ra } from "mayaka"',
      output: 'import { i, \nba, \nra } from "mayaka"',
      errors: [
        {
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 13,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 17,
          messageId: 'missingNewLine',
        },
      ],
    },
    {
      code: 'import { i, \nba, ra } from "mayaka"',
      output: 'import { i, \nba, \nra } from "mayaka"',
      errors: [
        {
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
          messageId: 'missingNewLine',
        },
      ],
    },
    {
      code: 'import { i, \nba, ra } from "mayaka"',
      options: [{ allowAllOnSameLine: true }],
      output: 'import { i, \nba, \nra } from "mayaka"',
      errors: [
        {
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
          messageId: 'allowSameLine',
        },
      ],
    },
    {
      code: 'import { a, b, c, d, e } from "mayaka"',
      options: [{ minItems: 4 }],
      output: 'import { a, \nb, \nc, \nd, \ne } from "mayaka"',
      errors: [
        {
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 13,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 16,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 19,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 20,
          endLine: 1,
          endColumn: 22,
          messageId: 'missingNewLine',
        },
      ],
    },
    {
      code: 'let ma, ya, ka; export { ma, ya, ka }',
      output: 'let ma, ya, ka; export { ma, \nya, \nka }',
      errors: [
        {
          line: 1,
          column: 28,
          endLine: 1,
          endColumn: 30,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 32,
          endLine: 1,
          endColumn: 34,
          messageId: 'missingNewLine',
        },
      ],
    },
    {
      code: 'let ma, ya, ka; export { ma, \nya, ka }',
      output: 'let ma, ya, ka; export { ma, \nya, \nka }',
      errors: [
        {
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
          messageId: 'missingNewLine',
        },
      ],
    },
    {
      code: 'let ma, ya, ka; export { ma, \nya, ka }',
      options: [{ allowAllOnSameLine: true }],
      output: 'let ma, ya, ka; export { ma, \nya, \nka }',
      errors: [
        {
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
          messageId: 'allowSameLine',
        },
      ],
    },
    {
      code: 'let a, b, c, d, e; export { a, b, c, d, e }',
      options: [{ minItems: 4 }],
      output: 'let a, b, c, d, e; export { a, \nb, \nc, \nd, \ne }',
      errors: [
        {
          line: 1,
          column: 30,
          endLine: 1,
          endColumn: 32,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 33,
          endLine: 1,
          endColumn: 35,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 36,
          endLine: 1,
          endColumn: 38,
          messageId: 'missingNewLine',
        },
        {
          line: 1,
          column: 39,
          endLine: 1,
          endColumn: 41,
          messageId: 'missingNewLine',
        },
      ],
    },
  ],
})
