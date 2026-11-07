# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def rightSideView(self, root):
        levels = []  # every level, left to right  # @viz init
        level = [root] if root else []  # @viz init
        while level:  # @viz level
            levels.append([node.val for node in level])  # @viz level
            level = [child for node in level for child in (node.left, node.right) if child]  # the next level, left to right  # @viz next
        return [vals[-1] for vals in levels]  # the rightmost value of each level  # @viz return
