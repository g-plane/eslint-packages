import * as eslint from 'eslint'
import rule from '../../src/rules/arrow-body-parens-linebreak'

const ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
  },
})

ruleTester.run('arrow-body-parens-linebreak', rule, {
  valid: [
    'mayaka => satoshi',
    'mayaka => { satoshi }',
    'mayaka => (satoshi)',
    'mayaka => (\nsatoshi\n)',
    {
      code: 'mayaka => (satoshi)',
      options: ['never'],
    },
    {
      code: 'mayaka => (\nsatoshi\n)',
      options: ['always'],
    },
  ],
  invalid: [
    {
      code: 'mayaka => (\nsatoshi)',
      errors: [
        {
          messageId: 'missingBefore',
          line: 2,
          column: 8,
          endLine: 2,
          endColumn: 9,
        },
      ],
      output: 'mayaka => (\nsatoshi\n)',
    },
    {
      code: 'mayaka => (satoshi\n)',
      errors: [
        {
          messageId: 'existedBefore',
          line: 1,
          column: 19,
          endLine: 2,
          endColumn: 2,
        },
      ],
      output: 'mayaka => (satoshi)',
    },
    {
      code: 'mayaka => (satoshi\n)',
      options: ['always'],
      errors: [
        {
          messageId: 'missingAfter',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
      ],
      output: 'mayaka => (\nsatoshi\n)',
    },
    {
      code: 'mayaka => (\nsatoshi)',
      options: ['always'],
      errors: [
        {
          messageId: 'missingBefore',
          line: 2,
          column: 8,
          endLine: 2,
          endColumn: 9,
        },
      ],
      output: 'mayaka => (\nsatoshi\n)',
    },
    {
      code: 'mayaka => (satoshi)',
      options: ['always'],
      errors: [
        {
          messageId: 'missingAfter',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
        {
          messageId: 'missingBefore',
          line: 1,
          column: 19,
          endLine: 1,
          endColumn: 20,
        },
      ],
      output: 'mayaka => (\nsatoshi\n)',
    },
    {
      code: 'mayaka => (\nsatoshi)',
      options: ['never'],
      errors: [
        {
          messageId: 'existedAfter',
          line: 1,
          column: 11,
          endLine: 2,
          endColumn: 1,
        },
      ],
      output: 'mayaka => (satoshi)',
    },
    {
      code: 'mayaka => (satoshi\n)',
      options: ['never'],
      errors: [
        {
          messageId: 'existedBefore',
          line: 1,
          column: 19,
          endLine: 2,
          endColumn: 2,
        },
      ],
      output: 'mayaka => (satoshi)',
    },
    {
      code: 'mayaka => (\nsatoshi\n)',
      options: ['never'],
      errors: [
        {
          messageId: 'existedAfter',
          line: 1,
          column: 11,
          endLine: 2,
          endColumn: 1,
        },
        {
          messageId: 'existedBefore',
          line: 2,
          column: 8,
          endLine: 3,
          endColumn: 2,
        },
      ],
      output: 'mayaka => (satoshi)',
    },
  ],
})
