# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def kthSmallest(self, root, k):
        stack = []  # the path of nodes whose left side is being visited  # @viz init
        node = root  # @viz init
        while True:  # @viz loop
            while node:  # go as far left as possible: that's the smallest left  # @viz down
                stack.append(node)  # @viz down
                node = node.left  # @viz down
            node = stack.pop()  # the next smallest value  # @viz pop
            k -= 1  # @viz pop
            if k == 0:  # @viz found
                return node.val  # @viz found
            node = node.right  # then everything to its right, smallest first  # @viz right
