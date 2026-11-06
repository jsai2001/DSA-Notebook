# Definition for a graph node.
# class Node(object):
#     def __init__(self, val=0, neighbors=None):
#         self.val = val
#         self.neighbors = neighbors if neighbors is not None else []
class Solution(object):
    def cloneGraph(self, node):
        copies = {}  # original node -> its copy  # @viz init

        def clone(old):
            if old in copies:  # already copied (the graph has cycles)  # @viz seen
                return copies[old]  # @viz seen
            copy = Node(old.val)  # @viz make
            copies[old] = copy  # record it BEFORE visiting neighbors  # @viz make
            for nb in old.neighbors:  # @viz wire
                copy.neighbors.append(clone(nb))  # @viz wire
            return copy  # @viz done

        return clone(node) if node else None  # @viz return
