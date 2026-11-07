class Trie(object):
    def __init__(self):
        self.root = {}  # a node is a dict: letter -> child node; "$" marks the end of a word  # @viz init
    def insert(self, word):
        node = self.root  # @viz insert
        for ch in word:  # @viz insert
            node = node.setdefault(ch, {})  # follow the letter, adding a node if it's missing  # @viz insert
        node["$"] = True  # a word ends here  # @viz end
    def _walk(self, s):  # the node reached by spelling s, or None  # @viz walk
        node = self.root  # @viz walk
        for ch in s:  # @viz walk
            if ch not in node:  # @viz walk
                return None  # @viz walk
            node = node[ch]  # @viz walk
        return node  # @viz walk
    def search(self, word):
        node = self._walk(word)  # @viz search
        return node is not None and "$" in node  # spelled out, and a word ends exactly here  # @viz search
    def startsWith(self, prefix):
        return self._walk(prefix) is not None  # spelled out is enough  # @viz prefix
