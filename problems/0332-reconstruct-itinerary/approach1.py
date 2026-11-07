import sys
sys.setrecursionlimit(5000)  # one call per ticket: up to 300 deep
class Solution(object):
    def findItinerary(self, tickets):
        out = {}  # airport -> its destinations, smallest first  # @viz init
        for a, b in sorted(tickets):  # @viz init
            out.setdefault(a, []).append(b)  # @viz init
        used = {a: [False] * len(v) for a, v in out.items()}  # @viz init
        route = ["JFK"]  # @viz init
        def go():  # try to use every remaining ticket from route[-1]  # @viz try
            if len(route) == len(tickets) + 1:  # all tickets used  # @viz done
                return True  # @viz done
            a = route[-1]  # @viz try
            for i, b in enumerate(out.get(a, [])):  # smallest destination first  # @viz try
                if not used[a][i] and (i == 0 or out[a][i] != out[a][i - 1] or used[a][i - 1]):  # skip a repeat of a ticket just tried  # @viz try
                    used[a][i] = True  # @viz take
                    route.append(b)  # @viz take
                    if go():  # the first full route found is the smallest one  # @viz take
                        return True  # @viz take
                    route.pop()  # dead end: undo and try the next ticket  # @viz undo
                    used[a][i] = False  # @viz undo
            return False  # @viz undo
        go()  # @viz return
        return route  # @viz return
