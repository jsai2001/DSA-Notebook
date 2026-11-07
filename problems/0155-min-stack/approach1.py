class MinStack(object):
    def __init__(self):
        self.stack = []  # @viz init

    def push(self, val):
        self.stack.append(val)  # @viz push

    def pop(self):
        self.stack.pop()  # @viz pop

    def top(self):
        return self.stack[-1]  # @viz top

    def getMin(self):
        best = self.stack[0]  # @viz min
        for x in self.stack:  # look at everything: O(n)  # @viz min
            if x < best:  # @viz min
                best = x  # @viz min
        return best  # @viz min
