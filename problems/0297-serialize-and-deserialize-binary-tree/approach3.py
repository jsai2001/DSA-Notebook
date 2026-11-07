# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Codec:
    def serialize(self, root):
        out = []  # pre-order with "#" for None, but with a stack instead of recursion  # @viz ser
        stack = [root]  # @viz ser
        while stack:  # @viz ser
            node = stack.pop()  # @viz ser
            if not node:  # @viz ser
                out.append("#")  # @viz ser
                continue  # @viz ser
            out.append(str(node.val))  # @viz ser
            stack.append(node.right)  # push right first, so left comes out first  # @viz ser
            stack.append(node.left)  # @viz ser
        return ",".join(out)  # @viz trim
    def deserialize(self, data):
        tokens = data.split(",")  # @viz root
        if tokens[0] == "#":  # @viz empty
            return None  # @viz empty
        root = TreeNode(int(tokens[0]))  # @viz root
        stack = [[root, 0]]  # (node, how many children it has been given so far)  # @viz root
        for t in tokens[1:]:  # each token is the next missing child of the node on top  # @viz link
            parent = stack[-1]  # @viz link
            child = None if t == "#" else TreeNode(int(t))  # @viz link
            if parent[1] == 0:  # @viz link
                parent[0].left = child  # @viz link
            else:  # @viz link
                parent[0].right = child  # @viz link
            parent[1] += 1  # @viz link
            while stack and stack[-1][1] == 2:  # both children set: this node is done  # @viz link
                stack.pop()  # @viz link
            if child:  # a real node: its own children come next  # @viz link
                stack.append([child, 0])  # @viz link
        return root  # @viz return
