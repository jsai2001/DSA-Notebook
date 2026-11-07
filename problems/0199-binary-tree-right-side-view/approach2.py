from collections import deque
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def rightSideView(self, root):
        if not root:  # @viz empty
            return []  # @viz empty
        res = []  # @viz init
        queue = deque([root])  # @viz init
        while queue:  # @viz level
            size = len(queue)  # exactly one level is in the queue  # @viz level
            for k in range(size):  # @viz pop
                node = queue.popleft()  # @viz pop
                if k == size - 1:  # the last node of the level is the one seen from the right  # @viz last
                    res.append(node.val)  # @viz last
                if node.left:  # @viz push
                    queue.append(node.left)  # @viz push
                if node.right:  # @viz push
                    queue.append(node.right)  # @viz push
        return res  # @viz return
