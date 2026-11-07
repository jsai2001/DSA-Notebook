from collections import deque
class Solution(object):
    def findCheapestPrice(self, n, flights, src, dst, k):
        out = [[] for _ in range(n)]  # out[u] = (v, price) for each flight from u  # @viz init
        for u, v, p in flights:  # @viz init
            out[u].append((v, p))  # @viz init
        best = [float("inf")] * n  # the cheapest price found to each city so far  # @viz init
        best[src] = 0  # @viz init
        queue = deque([(src, 0)])  # (city, price paid), one level per flight taken  # @viz init
        for _ in range(k + 1):  # at most k stops = at most k + 1 flights  # @viz level
            for _ in range(len(queue)):  # @viz level
                u, cost = queue.popleft()  # @viz fly
                for v, p in out[u]:  # @viz fly
                    if cost + p < best[v]:  # only keep going if this is cheaper than any way found before  # @viz fly
                        best[v] = cost + p  # @viz fly
                        queue.append((v, cost + p))  # @viz fly
        return -1 if best[dst] == float("inf") else best[dst]  # @viz return
