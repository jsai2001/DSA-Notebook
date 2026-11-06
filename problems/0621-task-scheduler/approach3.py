from collections import Counter
class Solution(object):
    def leastInterval(self, tasks, n):
        counts = Counter(tasks).values()  # @viz count
        most = max(counts)  # the most frequent task runs this many times  # @viz count
        tied = sum(1 for c in counts if c == most)  # how many tasks share that count  # @viz count
        # The most frequent tasks need most - 1 full blocks of n + 1 units, then one last block of size tied.
        frame = (most - 1) * (n + 1) + tied  # @viz frame
        return max(frame, len(tasks))  # with many kinds of task the gaps all fill, and no idle is needed  # @viz return
