class Solution(object):
    def findRedundantConnection(self, edges):
        parent = list(range(len(edges) + 1))  # every node starts as its own group  # @viz init

        def find(x):  # the group's representative (root)
            while parent[x] != x:
                parent[x] = parent[parent[x]]  # path halving keeps the trees flat
                x = parent[x]
            return x

        for a, b in edges:  # @viz edge
            ra, rb = find(a), find(b)  # @viz edge
            if ra == rb:  # already in one group: this edge closes a cycle  # @viz found
                return [a, b]  # @viz found
            parent[ra] = rb  # join the groups (the roots, not a and b)  # @viz union
