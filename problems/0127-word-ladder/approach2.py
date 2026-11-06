from collections import deque
class Solution(object):
    def ladderLength(self, beginWord, endWord, wordList):
        words = set(wordList)  # @viz init
        if endWord not in words:  # @viz init
            return 0  # @viz init
        words.discard(beginWord)  # @viz init
        queue = deque([beginWord])  # @viz init
        steps = 1  # words in the ladder so far  # @viz init
        while queue:  # @viz level
            steps += 1  # every word found in this level is one more step away  # @viz level
            for _ in range(len(queue)):  # @viz level
                word = queue.popleft()  # @viz pop
                for i in range(len(word)):  # @viz try
                    for c in "abcdefghijklmnopqrstuvwxyz":  # @viz try
                        nxt = word[:i] + c + word[i + 1:]  # change one letter  # @viz try
                        if nxt in words:  # a real word not used yet  # @viz hit
                            if nxt == endWord:  # @viz found
                                return steps  # @viz found
                            words.remove(nxt)  # removing it = marking it used  # @viz take
                            queue.append(nxt)  # @viz take
        return 0  # @viz none
