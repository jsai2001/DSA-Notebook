from collections import deque
class Solution(object):
    def ladderLength(self, beginWord, endWord, wordList):
        unseen = set(wordList)  # @viz init
        if endWord not in unseen:  # @viz init
            return 0  # @viz init
        unseen.discard(beginWord)  # @viz init
        queue = deque([beginWord])  # @viz init
        steps = 1  # words in the ladder so far  # @viz init
        while queue:  # @viz level
            for _ in range(len(queue)):  # one BFS level = one more word  # @viz level
                word = queue.popleft()  # @viz pop
                if word == endWord:  # @viz found
                    return steps  # @viz found
                for other in list(unseen):  # compare with every word not used yet  # @viz scan
                    if self.one_apart(word, other):  # @viz scan
                        unseen.remove(other)  # mark it used when it's queued  # @viz take
                        queue.append(other)  # @viz take
            steps += 1  # @viz next
        return 0  # @viz none

    def one_apart(self, a, b):
        diff = 0
        for x, y in zip(a, b):
            if x != y:
                diff += 1
                if diff > 1:
                    return False
        return diff == 1
