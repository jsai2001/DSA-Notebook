import heapq
class Solution(object):
    def minCostConnectPoints(self, points):
        n = len(points)  # @viz init
        in_tree = [False] * n  # @viz init
        heap = [(0, 0)]  # (cost to attach, point); start from point 0  # @viz init
        total = added = 0  # @viz init
        while added < n:  # @viz pop
            d, u = heapq.heappop(heap)  # the cheapest way to attach a new point  # @viz pop
            if in_tree[u]:  # an old, more expensive entry for a point already attached  # @viz stale
                continue  # @viz stale
            in_tree[u] = True  # @viz add
            total += d  # @viz add
            added += 1  # @viz add
            for v in range(n):  # offer every point outside the tree an edge from u  # @viz push
                if not in_tree[v]:  # @viz push
                    heapq.heappush(heap, (abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1]), v))  # @viz push
        return total  # @viz return
