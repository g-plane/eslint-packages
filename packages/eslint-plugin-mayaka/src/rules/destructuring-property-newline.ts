import * as estree from 'estree'
import * as eslint from 'eslint'

function checkElements(
  nodes:
    | estree.AssignmentProperty[]
    | estree.ImportSpecifier[]
    | estree.ExportSpecifier[],
  context: eslint.Rule.RuleContext,
  allowAllOnSameLine: boolean
): void {
  if (nodes.length <= 1) {
    return
  }

  if (
    allowAllOnSameLine &&
    nodes[0].loc!.start.line === nodes[nodes.length - 1].loc!.end.line
  ) {
    return
  }

  const [head, ...tail] = nodes
  tail.reduce((acc: typeof nodes[0], node: typeof nodes[0]) => {
    const end = acc.loc!.end
    const start = node.loc!.start
    if (end.line === start.line) {
      context.report({
        messageId: allowAllOnSameLine ? 'allowSameLine' : 'missingNewLine',
        loc: {
          start: end,
          end: start,
        },
        fix: fixer => fixer.insertTextBefore(node, '\n'),
      })
    }

    return node
  }, head)
}

interface RuleOptions {
  allowAllOnSameLine: boolean
  minItems: number
}

export default {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description:
        'Enforce placing destructuring properties on separate lines.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowAllOnSameLine: {
            type: 'boolean',
            default: false,
          },
          minItems: {
            type: 'integer',
            minimum: 1,
            default: 2,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingNewLine: 'Destructuring properties must go on a new line.',
      allowSameLine:
        "Destructuring properties must go on a new line if they aren't all on the same line.",
    },
  },
  create(context) {
    const options: RuleOptions = {
      allowAllOnSameLine: false,
      minItems: 2,
      ...context.options[0],
    }

    return {
      ObjectPattern(node: estree.ObjectPattern) {
        if (node.properties.length <= options.minItems) {
          return
        }

        checkElements(node.properties, context, options.allowAllOnSameLine)
      },
      ImportDeclaration(node: estree.ImportDeclaration) {
        if (node.specifiers.length <= options.minItems) {
          return
        }

        checkElements(
          node.specifiers.filter(
            (node): node is estree.ImportSpecifier =>
              node.type === 'ImportSpecifier'
          ),
          context,
          options.allowAllOnSameLine
        )
      },
      ExportNamedDeclaration(node: estree.ExportNamedDeclaration) {
        if (node.specifiers.length <= options.minItems) {
          return
        }

        checkElements(node.specifiers, context, options.allowAllOnSameLine)
      },
    }
  },
} as eslint.Rule.RuleModule
