class MinStack(object):
    def __init__(self):
        self.stack = []  # (value, smallest value at or below it)  # @viz init

    def push(self, val):
        low = val if not self.stack else min(val, self.stack[-1][1])  # @viz push
        self.stack.append((val, low))  # each entry remembers the minimum under it  # @viz push

    def pop(self):
        self.stack.pop()  # the entries below still have the right minimum  # @viz pop

    def top(self):
        return self.stack[-1][0]  # @viz top

    def getMin(self):
        return self.stack[-1][1]  # O(1)  # @viz min
