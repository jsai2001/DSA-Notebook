import sys
sys.setrecursionlimit(5000)  # one call per ticket: up to 300 deep
class Solution(object):
    def findItinerary(self, tickets):
        out = {}  # airport -> its destinations, sorted biggest first so pop() gives the smallest  # @viz init
        for a, b in sorted(tickets, reverse=True):  # @viz init
            out.setdefault(a, []).append(b)  # @viz init
        route = []  # filled backwards: an airport is added once it has no tickets left  # @viz init
        def visit(a):  # Hierholzer: use up every ticket out of a, then add a  # @viz visit
            while out.get(a):  # @viz visit
                visit(out[a].pop())  # always fly the smallest destination first  # @viz visit
            route.append(a)  # stuck here: this airport comes after everything visited from it  # @viz stuck
        visit("JFK")  # @viz return
        return route[::-1]  # @viz return
