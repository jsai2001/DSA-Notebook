class Solution(object):
    def findItinerary(self, tickets):
        out = {}  # airport -> its destinations, sorted biggest first so pop() gives the smallest  # @viz init
        for a, b in sorted(tickets, reverse=True):  # @viz init
            out.setdefault(a, []).append(b)  # @viz init
        stack, route = ["JFK"], []  # the stack is the current path  # @viz init
        while stack:  # @viz visit
            a = stack[-1]  # @viz visit
            if out.get(a):  # a ticket is left: fly it  # @viz visit
                stack.append(out[a].pop())  # @viz visit
            else:  # stuck: a is final from here on  # @viz stuck
                route.append(stack.pop())  # @viz stuck
        return route[::-1]  # @viz return
