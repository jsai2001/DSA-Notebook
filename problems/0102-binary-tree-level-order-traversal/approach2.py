from collections import deque
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def levelOrder(self, root):
        if not root:  # an empty tree has no levels: [], not [[]]  # @viz empty
            return []  # @viz empty
        result = []  # @viz init
        queue = deque([root])  # @viz init
        while queue:  # @viz loop
            level = []  # @viz loop
            for _ in range(len(queue)):  # exactly the nodes of this level are in the queue now  # @viz size
                node = queue.popleft()  # @viz pop
                level.append(node.val)  # @viz pop
                if node.left:  # their children go to the back: the next level  # @viz push
                    queue.append(node.left)  # @viz push
                if node.right:  # @viz push
                    queue.append(node.right)  # @viz push
            result.append(level)  # @viz done
        return result  # @viz return
