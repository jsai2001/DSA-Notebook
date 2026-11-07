from collections import deque
class Solution(object):
    def findOrder(self, numCourses, prerequisites):
        after = [[] for _ in range(numCourses)]  # after[b] = courses that need b  # @viz init
        need = [0] * numCourses  # prerequisites not taken yet  # @viz init
        for a, b in prerequisites:  # @viz init
            after[b].append(a)  # @viz init
            need[a] += 1  # @viz init
        queue = deque(c for c in range(numCourses) if need[c] == 0)  # courses you can take now  # @viz start
        order = []  # @viz start
        while queue:  # @viz take
            c = queue.popleft()  # @viz take
            order.append(c)  # @viz take
            for nxt in after[c]:  # @viz free
                need[nxt] -= 1  # @viz free
                if need[nxt] == 0:  # all of its prerequisites are taken now  # @viz free
                    queue.append(nxt)  # @viz free
        return order if len(order) == numCourses else []  # some course never reached 0: a cycle  # @viz return
