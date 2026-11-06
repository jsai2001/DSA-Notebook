# Definition for a graph node.
# class Node(object):
#     def __init__(self, val=0, neighbors=None):
#         self.val = val
#         self.neighbors = neighbors if neighbors is not None else []
from collections import deque
class Solution(object):
    def cloneGraph(self, node):
        if not node:  # @viz init
            return None  # @viz init
        copies = {node: Node(node.val)}  # original node -> its copy  # @viz init
        queue = deque([node])  # @viz init
        while queue:  # @viz pop
            old = queue.popleft()  # @viz pop
            for nb in old.neighbors:  # @viz look
                if nb not in copies:  # first time we see it  # @viz make
                    copies[nb] = Node(nb.val)  # copy it now, wire it when it's popped  # @viz make
                    queue.append(nb)  # @viz make
                copies[old].neighbors.append(copies[nb])  # @viz wire
        return copies[node]  # @viz return
