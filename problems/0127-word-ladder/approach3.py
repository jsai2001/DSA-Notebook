class Solution(object):
    def ladderLength(self, beginWord, endWord, wordList):
        words = set(wordList)  # @viz init
        if endWord not in words:  # without this, the back side would start at a word that isn't allowed  # @viz init
            return 0  # @viz init
        front, back = {beginWord}, {endWord}  # @viz init
        words.discard(beginWord)  # @viz init
        words.discard(endWord)  # @viz init
        steps = 1  # words in the ladder so far  # @viz init
        while front and back:  # @viz loop
            if len(front) > len(back):  # always grow the smaller side  # @viz swap
                front, back = back, front  # @viz swap
            steps += 1  # @viz grow
            grown = set()  # @viz grow
            for word in front:  # @viz pop
                for i in range(len(word)):  # @viz try
                    for c in "abcdefghijklmnopqrstuvwxyz":  # @viz try
                        nxt = word[:i] + c + word[i + 1:]  # @viz try
                        if nxt in back:  # the two searches meet  # @viz meet
                            return steps  # @viz meet
                        if nxt in words:  # @viz take
                            words.remove(nxt)  # @viz take
                            grown.add(nxt)  # @viz take
            front = grown  # @viz next
        return 0  # @viz none
