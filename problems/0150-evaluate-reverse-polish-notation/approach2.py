import sys
class Solution(object):
    def evalRPN(self, tokens):
        # A chain like "1 1 + 1 + ..." nests about n/2 calls deep: past Python's default 1000.
        sys.setrecursionlimit(max(1000, len(tokens) + 100))  # @viz init
        self.pos = len(tokens) - 1  # read from the end  # @viz init
        return self.ev(tokens)  # @viz init

    def ev(self, tokens):
        t = tokens[self.pos]  # @viz read
        self.pos -= 1  # @viz read
        if t not in "+-*/" or len(t) > 1:  # a number ("-3" is a number, not an operator)  # @viz num
            return int(t)  # @viz num
        b = self.ev(tokens)  # the right operand comes first when reading backwards  # @viz right
        a = self.ev(tokens)  # then the left one  # @viz left
        if t == "+": return a + b  # @viz apply
        if t == "-": return a - b  # @viz apply
        if t == "*": return a * b  # @viz apply
        return int(a / b)  # truncate toward zero  # @viz apply
