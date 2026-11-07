class Solution(object):
    def networkDelayTime(self, times, n, k):
        INF = float("inf")  # @viz init
        w = [[INF] * (n + 1) for _ in range(n + 1)]  # w[u][v] = the edge time, as a table  # @viz init
        for u, v, t in times:  # @viz init
            w[u][v] = t  # @viz init
        dist = [INF] * (n + 1)  # @viz init
        dist[k] = 0  # @viz init
        done = [False] * (n + 1)  # @viz init
        for _ in range(n):  # @viz pick
            u = min((v for v in range(1, n + 1) if not done[v]), key=lambda v: dist[v])  # the closest node not finished yet  # @viz pick
            if dist[u] == INF:  # the rest can't be reached  # @viz stuck
                return -1  # @viz stuck
            done[u] = True  # its time is final  # @viz pick
            for v in range(1, n + 1):  # update its neighbours  # @viz relax
                if dist[u] + w[u][v] < dist[v]:  # @viz relax
                    dist[v] = dist[u] + w[u][v]  # @viz relax
        return max(dist[1:])  # @viz return
