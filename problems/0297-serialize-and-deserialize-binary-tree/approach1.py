from collections import deque
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Codec:
    def serialize(self, root):
        out = []  # level by level, "null" for every missing child  # @viz ser
        queue = deque([root])  # @viz ser
        while queue:  # @viz ser
            node = queue.popleft()  # @viz ser
            if node:  # @viz ser
                out.append(str(node.val))  # @viz ser
                queue.append(node.left)  # @viz ser
                queue.append(node.right)  # @viz ser
            else:  # @viz ser
                out.append("null")  # @viz ser
        while out and out[-1] == "null":  # trailing nulls carry no information  # @viz trim
            out.pop()  # @viz trim
        return ",".join(out)  # @viz trim
    def deserialize(self, data):
        if not data:  # @viz empty
            return None  # @viz empty
        vals = data.split(",")  # @viz root
        root = TreeNode(int(vals[0]))  # @viz root
        queue = deque([root])  # parents waiting for their two children, in order  # @viz root
        i = 1  # @viz root
        while queue and i < len(vals):  # @viz link
            node = queue.popleft()  # the next two tokens are its left and right child  # @viz link
            for side in ("left", "right"):  # @viz link
                if i < len(vals) and vals[i] != "null":  # @viz link
                    child = TreeNode(int(vals[i]))  # @viz link
                    setattr(node, side, child)  # @viz link
                    queue.append(child)  # @viz link
                i += 1  # @viz link
        return root  # @viz return
