from collections import deque
class Solution(object):
    def canFinish(self, numCourses, prerequisites):
        after = [[] for _ in range(numCourses)]  # after[b] = courses that need b  # @viz init
        need = [0] * numCourses  # prerequisites not taken yet  # @viz init
        for a, b in prerequisites:  # @viz init
            after[b].append(a)  # @viz init
            need[a] += 1  # @viz init
        queue = deque(c for c in range(numCourses) if need[c] == 0)  # courses you can take now  # @viz start
        taken = 0  # @viz start
        while queue:  # @viz take
            c = queue.popleft()  # @viz take
            taken += 1  # @viz take
            for nxt in after[c]:  # @viz free
                need[nxt] -= 1  # one fewer prerequisite to wait for  # @viz free
                if need[nxt] == 0:  # @viz free
                    queue.append(nxt)  # @viz free
        return taken == numCourses  # courses on a cycle never reach need 0  # @viz return
