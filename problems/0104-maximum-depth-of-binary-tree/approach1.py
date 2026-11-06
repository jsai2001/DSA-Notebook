from collections import deque
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def maxDepth(self, root):
        if not root:  # an empty tree has depth 0  # @viz empty
            return 0  # @viz empty
        depth = 0  # @viz init
        queue = deque([root])  # @viz init
        while queue:  # one round per level  # @viz loop
            depth += 1  # @viz level
            for _ in range(len(queue)):  # exactly this level's nodes are in the queue  # @viz level
                node = queue.popleft()  # @viz pop
                if node.left:  # @viz push
                    queue.append(node.left)  # @viz push
                if node.right:  # @viz push
                    queue.append(node.right)  # @viz push
        return depth  # the number of levels  # @viz return
