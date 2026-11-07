class Solution(object):
    def networkDelayTime(self, times, n, k):
        INF = float("inf")  # @viz init
        dist = [INF] * (n + 1)  # dist[v] = the fastest time to v found so far  # @viz init
        dist[k] = 0  # @viz init
        for _ in range(n - 1):  # a shortest path has at most n - 1 edges  # @viz round
            changed = False  # @viz round
            for u, v, w in times:  # try every edge  # @viz relax
                if dist[u] + w < dist[v]:  # going through u is faster  # @viz relax
                    dist[v] = dist[u] + w  # @viz relax
                    changed = True  # @viz relax
            if not changed:  # nothing improved: it's final  # @viz stop
                break  # @viz stop
        best = max(dist[1:])  # the signal reaches everyone when the slowest node gets it  # @viz return
        return -1 if best == INF else best  # @viz return
