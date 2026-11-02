import sys
class Solution(object):
    def isSubtree(self, root, subRoot):
        sys.setrecursionlimit(10000)
        def ser(node):  # "," before every value, "#" for a missing child
            return ",%d%s%s" % (node.val, ser(node.left), ser(node.right)) if node else ",#"
        return ser(subRoot) in ser(root)  # the "," stops ",2" from matching inside ",12"
