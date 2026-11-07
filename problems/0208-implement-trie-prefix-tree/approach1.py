class Trie(object):
    def __init__(self):
        self.words = set()  # just the words  # @viz init
    def insert(self, word):
        self.words.add(word)  # @viz insert
    def search(self, word):
        return word in self.words  # one hash lookup  # @viz search
    def startsWith(self, prefix):
        return any(w.startswith(prefix) for w in self.words)  # check every word: slow with many words  # @viz prefix
