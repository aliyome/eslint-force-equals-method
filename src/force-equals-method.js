"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);
exports.rule = createRule({
    create(context) {
        return {
            BinaryExpression(node) {
                if (!['===', '!==', '=='].includes(node.operator)) {
                    return;
                }
                console.log(node.left);
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
            description: 'disallow the use of the `==` and `===` operator type. use the `equals` method instead.',
        },
        messages: {
            'force-equals-method': 'Use the `equals` method instead.',
        },
        schema: [],
    },
    name: 'force-equals-method',
    defaultOptions: [],
});
