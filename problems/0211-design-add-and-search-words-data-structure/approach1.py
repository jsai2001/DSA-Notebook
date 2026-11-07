class WordDictionary(object):
    def __init__(self):
        self.words = []  # @viz init
    def addWord(self, word):
        self.words.append(word)  # @viz add
    def search(self, word):
        for w in self.words:  # try every word  # @viz scan
            if len(w) == len(word) and all(p == "." or p == c for p, c in zip(word, w)):  # "." matches any letter  # @viz scan
                return True  # @viz found
        return False  # @viz none
