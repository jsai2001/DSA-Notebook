class Solution(object):
    def minCostConnectPoints(self, points):
        n = len(points)  # @viz init
        INF = float("inf")  # @viz init
        dist = [INF] * n  # dist[v]: the cheapest edge from the tree to v so far  # @viz init
        dist[0] = 0  # start from point 0  # @viz init
        in_tree = [False] * n  # @viz init
        total = 0  # @viz init
        for _ in range(n):  # add one point per round  # @viz pick
            u = -1  # @viz pick
            for v in range(n):  # the closest point not in the tree: a scan, no heap  # @viz pick
                if not in_tree[v] and (u == -1 or dist[v] < dist[u]):  # @viz pick
                    u = v  # @viz pick
            in_tree[u] = True  # @viz add
            total += dist[u]  # @viz add
            ux, uy = points[u]  # @viz relax
            for v in range(n):  # u may now be a cheaper way to reach other points  # @viz relax
                if not in_tree[v]:  # @viz relax
                    d = abs(ux - points[v][0]) + abs(uy - points[v][1])  # @viz relax
                    if d < dist[v]:  # @viz relax
                        dist[v] = d  # @viz relax
        return total  # @viz return
