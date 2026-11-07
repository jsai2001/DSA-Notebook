import sys
sys.setrecursionlimit(30000)  # a chain of 10^4 nodes is 10^4 calls deep
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Codec:
    def serialize(self, root):
        out = []  # pre-order: node, left subtree, right subtree; "#" for None  # @viz ser
        def walk(node):  # @viz ser
            if not node:  # @viz ser
                out.append("#")  # @viz ser
                return  # @viz ser
            out.append(str(node.val))  # @viz ser
            walk(node.left)  # @viz ser
            walk(node.right)  # @viz ser
        walk(root)  # @viz ser
        return ",".join(out)  # @viz trim
    def deserialize(self, data):
        tokens = iter(data.split(","))  # read the tokens in the same order they were written  # @viz root
        def build():  # @viz link
            t = next(tokens)  # @viz link
            if t == "#":  # @viz empty
                return None  # @viz empty
            node = TreeNode(int(t))  # @viz link
            node.left = build()  # the left subtree's tokens come right after the node  # @viz link
            node.right = build()  # @viz link
            return node  # @viz link
        return build()  # @viz return
