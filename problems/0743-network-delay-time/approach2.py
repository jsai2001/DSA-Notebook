import heapq
class Solution(object):
    def networkDelayTime(self, times, n, k):
        graph = [[] for _ in range(n + 1)]  # graph[u] = (v, time) for each edge out of u  # @viz init
        for u, v, w in times:  # @viz init
            graph[u].append((v, w))  # @viz init
        dist = {}  # final times, filled in the order nodes are reached  # @viz init
        heap = [(0, k)]  # (time, node), earliest first  # @viz init
        while heap:  # @viz pop
            d, u = heapq.heappop(heap)  # @viz pop
            if u in dist:  # an older, slower entry for a node already done  # @viz stale
                continue  # @viz stale
            dist[u] = d  # the earliest time u can get the signal  # @viz done
            for v, w in graph[u]:  # @viz push
                if v not in dist:  # @viz push
                    heapq.heappush(heap, (d + w, v))  # @viz push
        return max(dist.values()) if len(dist) == n else -1  # someone unreached: -1  # @viz return
