# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def diameterOfBinaryTree(self, root):
        height = {None: 0}  # height of every finished node; an empty child has height 0  # @viz init
        best = 0  # @viz init
        stack = [(root, False)]  # (node, are its children finished?)  # @viz init
        while stack:  # @viz loop
            node, children_done = stack.pop()  # @viz loop
            if not node:  # @viz skip
                continue  # @viz skip
            if children_done:  # both subtrees are finished: work out this node  # @viz finish
                left, right = height[node.left], height[node.right]  # @viz finish
                best = max(best, left + right)  # @viz finish
                height[node] = 1 + max(left, right)  # @viz finish
            else:  # come back to node after its children  # @viz push
                stack.append((node, True))  # @viz push
                stack.append((node.right, False))  # @viz push
                stack.append((node.left, False))  # @viz push
        return best  # @viz return
