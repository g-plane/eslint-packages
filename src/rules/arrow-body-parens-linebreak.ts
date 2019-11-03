import * as estree from 'estree'
import * as eslint from 'eslint'

type RuleOptions = 'consistent' | 'always' | 'never'

export default {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description:
        'Enforce style of linebreaks before/after parens of arrow functions bodies.',
    },
    schema: [
      {
        enum: ['consistent', 'always', 'never'],
      },
    ],
    messages: {
      missingAfter: 'Linebreak is missing after `(`.',
      missingBefore: 'Linebreak is missing after `)`.',
      existedAfter: 'Linebreak should not exist after `(`.',
      existedBefore: 'Linebreak should not exist before `)`.',
    },
  },
  create(context) {
    const sourceCode = context.getSourceCode()
    const option: RuleOptions | void = context.options[0]

    return {
      ArrowFunctionExpression(node: estree.ArrowFunctionExpression) {
        const { body } = node
        const start = sourceCode.getTokenBefore(body)
        const end = sourceCode.getTokenAfter(body)
        const first = sourceCode.getFirstToken(body)
        const last = sourceCode.getLastToken(body)

        if (
          !start ||
          !end ||
          start.value !== '(' ||
          end.value !== ')' ||
          !first ||
          !last
        ) {
          return
        }

        const lineOfStart = start.loc.start.line
        const lineOfEnd = end.loc.end.line
        const lineOfFirst = first.loc.start.line
        const lineOfLast = last.loc.end.line

        if (option === 'always') {
          if (lineOfStart === lineOfFirst) {
            context.report({
              messageId: 'missingAfter',
              loc: {
                start: start.loc.start,
                end: first.loc.start,
              },
              fix: fixer => fixer.insertTextAfter(start, '\n'),
            })
          }

          if (lineOfEnd === lineOfLast) {
            context.report({
              messageId: 'missingBefore',
              loc: {
                start: last.loc.end,
                end: end.loc.end,
              },
              fix: fixer => fixer.insertTextBefore(end, '\n'),
            })
          }
        } else if (option === 'never') {
          if (lineOfStart !== lineOfFirst) {
            context.report({
              messageId: 'existedAfter',
              loc: {
                start: start.loc.start,
                end: first.loc.start,
              },
              fix: fixer => fixer.removeRange([start.range[1], first.range[0]]),
            })
          }

          if (lineOfEnd !== lineOfLast) {
            context.report({
              messageId: 'existedBefore',
              loc: {
                start: last.loc.end,
                end: end.loc.end,
              },
              fix: fixer => fixer.removeRange([last.range[1], end.range[0]]),
            })
          }
        } else {
          if (lineOfStart !== lineOfFirst && lineOfEnd === lineOfLast) {
            context.report({
              messageId: 'missingBefore',
              loc: {
                start: last.loc.end,
                end: end.loc.end,
              },
              fix: fixer => fixer.insertTextBefore(end, '\n'),
            })
          }

          if (lineOfStart === lineOfFirst && lineOfEnd !== lineOfLast) {
            context.report({
              messageId: 'existedBefore',
              loc: {
                start: last.loc.end,
                end: end.loc.end,
              },
              fix: fixer => fixer.removeRange([last.range[1], end.range[0]]),
            })
          }
        }
      },
    }
  },
} as eslint.Rule.RuleModule
