# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
import sys
class Solution(object):
    def isSubtree(self, root, subRoot):
        sys.setrecursionlimit(10000)  # a one-sided tree can be 2000 levels deep
        ids = {}  # (val, left id, right id) -> a number; two subtrees get the same number exactly when they're equal  # @viz init
        def tag(node, out):  # returns node's number, and adds it to out  # @viz tag
            if not node:  # @viz tag
                return 0  # every empty subtree is number 0  # @viz tag
            key = (node.val, tag(node.left, out), tag(node.right, out))  # children first  # @viz key
            if key not in ids:  # @viz key
                ids[key] = len(ids) + 1  # a shape not seen before: the next number  # @viz key
            out.append(ids[key])  # @viz key
            return ids[key]  # @viz key
        target = tag(subRoot, [])  # @viz target
        everywhere = []  # the number of every subtree of root  # @viz scan
        tag(root, everywhere)  # @viz scan
        return target in everywhere  # @viz return
