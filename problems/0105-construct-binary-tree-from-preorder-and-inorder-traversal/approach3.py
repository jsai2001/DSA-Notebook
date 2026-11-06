# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def buildTree(self, preorder, inorder):
        root = TreeNode(preorder[0])  # @viz init
        stack = [root]  # the path of nodes still waiting for their right child  # @viz init
        j = 0  # the next value of inorder not yet reached  # @viz init
        for v in preorder[1:]:  # @viz loop
            node = TreeNode(v)  # @viz loop
            if stack[-1].val != inorder[j]:  # the top's left side isn't finished: v is its left child  # @viz left
                stack[-1].left = node  # @viz left
            else:  # the top's left side is done: climb up to the last node inorder has reached  # @viz climb
                parent = None  # @viz climb
                while stack and stack[-1].val == inorder[j]:  # @viz climb
                    parent = stack.pop()  # @viz climb
                    j += 1  # @viz climb
                parent.right = node  # v is that node's right child  # @viz right
            stack.append(node)  # @viz push
        return root  # @viz return
