from collections import deque
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def invertTree(self, root):
        queue = deque([root] if root else [])  # @viz init
        while queue:  # visit every node, level by level  # @viz pop
            node = queue.popleft()  # @viz pop
            node.left, node.right = node.right, node.left  # swap its two children  # @viz swap
            if node.left:  # @viz push
                queue.append(node.left)  # @viz push
            if node.right:  # @viz push
                queue.append(node.right)  # @viz push
        return root  # @viz return
