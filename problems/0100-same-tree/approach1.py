# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isSameTree(self, p, q):
        def write(node, out):  # the tree as text, with "#" for every missing child  # @viz write
            if not node:  # @viz write
                out.append("#")  # without this, [1,2] and [1,null,2] would both give "1,2"  # @viz write
                return  # @viz write
            out.append(str(node.val))  # @viz write
            write(node.left, out)  # @viz write
            write(node.right, out)  # @viz write
        a, b = [], []  # @viz init
        write(p, a)  # @viz init
        write(q, b)  # @viz init
        return a == b  # same text means same shape and same values  # @viz compare
