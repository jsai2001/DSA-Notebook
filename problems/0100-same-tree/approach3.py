from collections import deque
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isSameTree(self, p, q):
        queue = deque([(p, q)])  # pairs of nodes at the same spot in both trees  # @viz init
        while queue:  # @viz loop
            a, b = queue.popleft()  # @viz loop
            if not a and not b:  # both missing: fine  # @viz both
                continue  # @viz both
            if not a or not b or a.val != b.val:  # one missing, or different values  # @viz diff
                return False  # @viz diff
            queue.append((a.left, b.left))  # @viz push
            queue.append((a.right, b.right))  # @viz push
        return True  # every pair matched  # @viz return
