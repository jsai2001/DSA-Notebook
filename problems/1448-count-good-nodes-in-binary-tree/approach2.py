# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def goodNodes(self, root):
        count = 0  # @viz init
        stack = [(root, root.val)]  # (node, largest value above it)  # @viz init
        while stack:  # @viz loop
            node, best = stack.pop()  # @viz pop
            if node.val >= best:  # @viz check
                count += 1  # @viz good
            best = max(best, node.val)  # @viz update
            # push right first so the left child is popped (visited) first
            if node.right:  # @viz push
                stack.append((node.right, best))  # @viz push
            if node.left:  # @viz push
                stack.append((node.left, best))  # @viz push
        return count  # @viz return
