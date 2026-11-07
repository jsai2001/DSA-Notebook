class Solution(object):
    def evalRPN(self, tokens):
        stack = []  # @viz init
        for t in tokens:  # @viz loop
            if t not in "+-*/" or len(t) > 1:  # a number ("-3" is a number, not an operator)  # @viz push
                stack.append(int(t))  # @viz push
                continue  # @viz push
            b = stack.pop()  # the top is the RIGHT operand  # @viz pop
            a = stack.pop()  # @viz pop
            if t == "+": stack.append(a + b)  # @viz apply
            elif t == "-": stack.append(a - b)  # @viz apply
            elif t == "*": stack.append(a * b)  # @viz apply
            else: stack.append(int(a / b))  # truncate toward zero; // would floor  # @viz apply
        return stack[0]  # @viz return
