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
      errors: [{ messageId: 'missingBefore' }],
      output: 'mayaka => (\nsatoshi\n)',
    },
    {
      code: 'mayaka => (satoshi\n)',
      errors: [{ messageId: 'existedBefore' }],
      output: 'mayaka => (satoshi)',
    },
    {
      code: 'mayaka => (satoshi\n)',
      options: ['always'],
      errors: [{ messageId: 'missingAfter' }],
      output: 'mayaka => (\nsatoshi\n)',
    },
    {
      code: 'mayaka => (\nsatoshi)',
      options: ['always'],
      errors: [{ messageId: 'missingBefore' }],
      output: 'mayaka => (\nsatoshi\n)',
    },
    {
      code: 'mayaka => (satoshi)',
      options: ['always'],
      errors: [{ messageId: 'missingAfter' }, { messageId: 'missingBefore' }],
      output: 'mayaka => (\nsatoshi\n)',
    },
    {
      code: 'mayaka => (\nsatoshi)',
      options: ['never'],
      errors: [{ messageId: 'existedAfter' }],
      output: 'mayaka => (satoshi)',
    },
    {
      code: 'mayaka => (satoshi\n)',
      options: ['never'],
      errors: [{ messageId: 'existedBefore' }],
      output: 'mayaka => (satoshi)',
    },
    {
      code: 'mayaka => (\nsatoshi\n)',
      options: ['never'],
      errors: [{ messageId: 'existedAfter' }, { messageId: 'existedBefore' }],
      output: 'mayaka => (satoshi)',
    },
  ],
})
