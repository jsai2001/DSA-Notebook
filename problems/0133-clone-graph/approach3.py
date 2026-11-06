# Definition for a graph node.
# class Node(object):
#     def __init__(self, val=0, neighbors=None):
#         self.val = val
#         self.neighbors = neighbors if neighbors is not None else []
class Solution(object):
    def cloneGraph(self, node):
        if not node:  # @viz init
            return None  # @viz init
        # Pass 1: find every node. Values are unique (1..100), so they can be array indexes.
        old = [None] * 101  # old[v] = the original node with value v  # @viz find
        stack = [node]  # @viz find
        old[node.val] = node  # @viz find
        while stack:  # @viz find
            cur = stack.pop()  # @viz find
            for nb in cur.neighbors:  # @viz find
                if old[nb.val] is None:  # @viz find
                    old[nb.val] = nb  # @viz find
                    stack.append(nb)  # @viz find
        new = [Node(v) if old[v] else None for v in range(101)]  # one copy per node  # @viz make
        # Pass 2: wire each copy to the copies of its neighbors.
        for v in range(1, 101):  # @viz wire
            if old[v]:  # @viz wire
                new[v].neighbors = [new[nb.val] for nb in old[v].neighbors]  # @viz wire
        return new[node.val]  # @viz return
