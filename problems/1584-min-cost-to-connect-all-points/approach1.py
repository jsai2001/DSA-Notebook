class Solution(object):
    def minCostConnectPoints(self, points):
        n = len(points)  # @viz init
        edges = []  # every pair of points is an edge  # @viz edges
        for i in range(n):  # @viz edges
            for j in range(i + 1, n):  # @viz edges
                d = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])  # @viz edges
                edges.append((d, i, j))  # @viz edges
        edges.sort()  # cheapest first  # @viz sort
        parent = list(range(n))  # union-find: which group each point is in  # @viz sort

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]  # path halving
                x = parent[x]
            return x

        total = used = 0  # @viz sort
        for d, i, j in edges:  # @viz try
            ri, rj = find(i), find(j)  # @viz try
            if ri == rj:  # already connected: this edge would make a cycle  # @viz skip
                continue  # @viz skip
            parent[ri] = rj  # join the two groups  # @viz take
            total += d  # @viz take
            used += 1  # @viz take
            if used == n - 1:  # a tree on n points has n - 1 edges  # @viz done
                break  # @viz done
        return total  # @viz return
