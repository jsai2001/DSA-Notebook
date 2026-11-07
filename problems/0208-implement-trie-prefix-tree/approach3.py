class Node(object):
    __slots__ = ("child", "end")
    def __init__(self):
        self.child = [None] * 26  # child[k] = the node for letter chr(ord('a') + k)
        self.end = False
class Trie(object):
    def __init__(self):
        self.root = Node()  # @viz init
    def insert(self, word):
        node = self.root  # @viz insert
        for ch in word:  # @viz insert
            k = ord(ch) - 97  # 'a' -> 0 ... 'z' -> 25  # @viz insert
            if node.child[k] is None:  # @viz insert
                node.child[k] = Node()  # @viz insert
            node = node.child[k]  # @viz insert
        node.end = True  # a word ends here  # @viz end
    def _walk(self, s):  # the node reached by spelling s, or None  # @viz walk
        node = self.root  # @viz walk
        for ch in s:  # @viz walk
            node = node.child[ord(ch) - 97]  # @viz walk
            if node is None:  # @viz walk
                return None  # @viz walk
        return node  # @viz walk
    def search(self, word):
        node = self._walk(word)  # @viz search
        return node is not None and node.end  # spelled out, and a word ends exactly here  # @viz search
    def startsWith(self, prefix):
        return self._walk(prefix) is not None  # spelled out is enough  # @viz prefix
