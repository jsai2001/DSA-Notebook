class Solution(object):
    def findRedundantConnection(self, edges):
        n = len(edges)  # @viz init
        adj = [[] for _ in range(n + 1)]  # the graph so far  # @viz init
        for a, b in edges:  # add the edges in order  # @viz edge
            seen = {a}  # before adding a-b: is b already reachable from a?  # @viz search
            stack = [a]  # @viz search
            while stack:  # @viz search
                u = stack.pop()  # @viz search
                for v in adj[u]:  # @viz search
                    if v not in seen:  # @viz search
                        seen.add(v)  # @viz search
                        stack.append(v)  # @viz search
            if b in seen:  # yes: a-b would close a cycle, and it's the last edge of that cycle  # @viz found
                return [a, b]  # @viz found
            adj[a].append(b)  # @viz add
            adj[b].append(a)  # @viz add
