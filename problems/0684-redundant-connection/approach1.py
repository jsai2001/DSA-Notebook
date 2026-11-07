class Solution(object):
    def findRedundantConnection(self, edges):
        n = len(edges)  # n nodes, n edges: one edge too many for a tree  # @viz init
        for skip in range(n - 1, -1, -1):  # last edge first: the answer is the last one that works  # @viz skip
            adj = [[] for _ in range(n + 1)]  # @viz build
            for k, (a, b) in enumerate(edges):  # the graph without edge `skip`  # @viz build
                if k != skip:  # @viz build
                    adj[a].append(b)  # @viz build
                    adj[b].append(a)  # @viz build
            seen = {1}  # @viz walk
            stack = [1]  # @viz walk
            while stack:  # can every node be reached from node 1?  # @viz walk
                u = stack.pop()  # @viz walk
                for v in adj[u]:  # @viz walk
                    if v not in seen:  # @viz walk
                        seen.add(v)  # @viz walk
                        stack.append(v)  # @viz walk
            if len(seen) == n:  # connected with n - 1 edges: a tree  # @viz found
                return edges[skip]  # @viz found
