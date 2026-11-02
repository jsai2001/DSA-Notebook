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
        def preorder(node, out):  # values in preorder, with None for every missing child  # @viz walk
            if not node:  # @viz walk
                out.append(None)  # @viz walk
                return out  # @viz walk
            out.append(node.val)  # @viz walk
            preorder(node.left, out)  # @viz walk
            preorder(node.right, out)  # @viz walk
            return out  # @viz walk
        text, pattern = preorder(root, []), preorder(subRoot, [])  # @viz walk
        # KMP. fail[i]: length of the longest proper prefix of pattern[:i + 1] that is also its suffix
        fail = [0] * len(pattern)  # @viz table
        k = 0  # @viz table
        for i in range(1, len(pattern)):  # @viz table
            while k and pattern[i] != pattern[k]:  # @viz table
                k = fail[k - 1]  # @viz table
            if pattern[i] == pattern[k]:  # @viz table
                k += 1  # @viz table
            fail[i] = k  # @viz table
        k = 0  # how much of pattern matches the text read so far  # @viz search
        for x in text:  # @viz search
            while k and x != pattern[k]:  # mismatch: fall back in pattern, never back in text  # @viz back
                k = fail[k - 1]  # @viz back
            if x == pattern[k]:  # @viz search
                k += 1  # @viz search
                if k == len(pattern):  # all of subRoot's preorder, in a row  # @viz found
                    return True  # @viz found
        return False  # @viz return
