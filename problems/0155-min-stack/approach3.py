class MinStack(object):
    def __init__(self):
        self.stack = []  # @viz init
        self.mins = []  # the minimum so far, pushed only when it changes (or repeats)  # @viz init

    def push(self, val):
        self.stack.append(val)  # @viz push
        if not self.mins or val <= self.mins[-1]:  # <=, not <: a repeated minimum is pushed again  # @viz push
            self.mins.append(val)  # @viz push

    def pop(self):
        if self.stack.pop() == self.mins[-1]:  # removing the current minimum  # @viz pop
            self.mins.pop()  # @viz pop

    def top(self):
        return self.stack[-1]  # @viz top

    def getMin(self):
        return self.mins[-1]  # O(1)  # @viz min
