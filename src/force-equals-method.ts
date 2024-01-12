import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

export const rule = createRule({
  create(context) {
    return {
      BinaryExpression(node) {
        if (!['===', '!==', '=='].includes(node.operator)) {
          return;
        }

        // TODO: node.left の型情報を使いたい

        context.report({
          node,
          messageId: 'force-equals-method',
        });
      },
    };
  },

  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow the use of the `==` and `===` operator type. use the `equals` method instead.',
    },
    messages: {
      'force-equals-method': 'Use the `equals` method instead.',
    },
    schema: [],
  },
  name: 'force-equals-method',
  defaultOptions: [],
});
