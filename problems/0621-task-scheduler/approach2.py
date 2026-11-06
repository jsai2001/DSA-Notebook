import heapq
from collections import Counter, deque
class Solution(object):
    def leastInterval(self, tasks, n):
        heap = [-c for c in Counter(tasks).values()]  # counts as negatives: a max-heap  # @viz init
        heapq.heapify(heap)  # @viz init
        waiting = deque()  # (count left, time it may run again), in the order they ran  # @viz init
        time = 0  # @viz init
        while heap or waiting:  # @viz tick
            time += 1  # @viz tick
            if heap:  # run the task with the most left  # @viz run
                c = heapq.heappop(heap) + 1  # one fewer (counts are negative)  # @viz run
                if c:  # some left: it waits n units  # @viz run
                    waiting.append((c, time + n))  # @viz run
            if waiting and waiting[0][1] == time:  # its wait is over: back in the heap  # @viz back
                heapq.heappush(heap, waiting.popleft()[0])  # @viz back
        return time  # @viz return
