import heapq
class Solution(object):
    def findCheapestPrice(self, n, flights, src, dst, k):
        out = [[] for _ in range(n)]  # @viz init
        for u, v, p in flights:  # @viz init
            out[u].append((v, p))  # @viz init
        fewest = [float("inf")] * n  # the fewest flights used by any popped route to each city  # @viz init
        heap = [(0, src, 0)]  # (price, city, flights used), cheapest first  # @viz init
        while heap:  # @viz pop
            cost, u, used = heapq.heappop(heap)  # @viz pop
            if u == dst:  # the cheapest route that stays within k stops  # @viz done
                return cost  # @viz done
            if used >= fewest[u] or used > k:  # a cheaper route got here with no more flights; or no flights left  # @viz skip
                continue  # @viz skip
            fewest[u] = used  # @viz push
            for v, p in out[u]:  # @viz push
                heapq.heappush(heap, (cost + p, v, used + 1))  # @viz push
        return -1  # @viz none
