class Node(object):
    __slots__ = ("child", "end")
    def __init__(self):
        self.child = {}  # letter -> child node (a dict was faster than 26 slots in Python)
        self.end = False
class WordDictionary(object):
    def __init__(self):
        self.root = Node()  # @viz init
    def addWord(self, word):
        node = self.root  # @viz add
        for ch in word:  # @viz add
            if ch not in node.child:  # @viz add
                node.child[ch] = Node()  # @viz add
            node = node.child[ch]  # @viz add
        node.end = True  # a word ends here  # @viz add
    def search(self, word):
        def dfs(node, i):  # can word[i:] be spelled from node?  # @viz dfs
            if i == len(word):  # every letter matched  # @viz done
                return node.end  # @viz done
            if word[i] == ".":  # any child will do: try each one  # @viz dot
                return any(dfs(c, i + 1) for c in node.child.values())  # @viz dot
            nxt = node.child.get(word[i])  # a letter: only one child to follow  # @viz letter
            return nxt is not None and dfs(nxt, i + 1)  # @viz letter
        return dfs(self.root, 0)  # @viz search
