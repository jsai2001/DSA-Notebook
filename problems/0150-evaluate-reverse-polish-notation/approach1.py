class Solution(object):
    def evalRPN(self, tokens):
        ops = "+-*/"  # @viz init
        items = [t if t in ops else int(t) for t in tokens]  # operators stay strings  # @viz init
        while len(items) > 1:  # @viz find
            i = 0  # @viz find
            while not isinstance(items[i], str):  # find the first operator, from the start each time  # @viz find
                i += 1  # @viz find
            a, b, op = items[i - 2], items[i - 1], items[i]  # the two numbers just before it  # @viz apply
            if op == "+": r = a + b  # @viz apply
            elif op == "-": r = a - b  # @viz apply
            elif op == "*": r = a * b  # @viz apply
            else: r = int(a / b)  # truncate toward zero, not floor  # @viz apply
            items[i - 2:i + 1] = [r]  # three items become one  # @viz replace
        return items[0]  # @viz return
