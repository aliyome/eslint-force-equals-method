import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { SymbolFlags, TypeChecker } from 'typescript';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

export const rule = createRule({
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker: TypeChecker = parserServices.program?.getTypeChecker()!;

    function checkNode(node: TSESTree.Node) {
      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = typeChecker.getTypeAtLocation(tsNode);

      if (typeChecker.typeToString(type) === 'any') {
        return false;
      }

      const equalsSymbol = typeChecker.getPropertyOfType(type, 'equals');
      return equalsSymbol && (equalsSymbol.flags & SymbolFlags.Method) !== 0;
    }

    return {
      BinaryExpression(node: TSESTree.BinaryExpression) {
        if (!['===', '!==', '==', '!='].includes(node.operator)) {
          return;
        }

        if (checkNode(node.left) || checkNode(node.right)) {
          context.report({
            node,
            messageId: 'force-equals-method',
            data: {
              operator: node.operator,
            },
          });
        }
      },
    };
  },

  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow the use of the `==`, `!==`, `===`, `!===` operator. Use the `equals` method instead.',
    },
    messages: {
      'force-equals-method':
        'Use the `equals` method instead of `{{operator}}`.',
    },
    schema: [],
  },
  name: 'force-equals-method',
  defaultOptions: [],
});
