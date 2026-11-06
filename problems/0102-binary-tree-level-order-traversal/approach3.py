# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def levelOrder(self, root):
        result = []  # @viz init
        level = [root] if root else []  # the nodes of the current level, left to right  # @viz init
        while level:  # @viz loop
            result.append([node.val for node in level])  # @viz done
            nxt = []  # @viz next
            for node in level:  # their children, in order, are the next level  # @viz next
                if node.left:  # @viz next
                    nxt.append(node.left)  # @viz next
                if node.right:  # @viz next
                    nxt.append(node.right)  # @viz next
            level = nxt  # @viz swap
        return result  # @viz return
