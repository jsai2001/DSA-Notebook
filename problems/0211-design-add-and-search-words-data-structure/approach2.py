class WordDictionary(object):
    def __init__(self):
        self.by_len = {}  # length -> the set of words with that length  # @viz init
    def addWord(self, word):
        self.by_len.setdefault(len(word), set()).add(word)  # @viz add
    def search(self, word):
        words = self.by_len.get(len(word), set())  # only words of the same length can match  # @viz group
        if "." not in word:  # no wildcard: one hash lookup  # @viz exact
            return word in words  # @viz exact
        return any(all(p == "." or p == c for p, c in zip(word, w)) for w in words)  # @viz scan
