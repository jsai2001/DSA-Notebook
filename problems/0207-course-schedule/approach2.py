import sys
sys.setrecursionlimit(10000)  # a chain of 2000 courses is 2000 calls deep
class Solution(object):
    def canFinish(self, numCourses, prerequisites):
        after = [[] for _ in range(numCourses)]  # after[b] = courses that need b  # @viz init
        for a, b in prerequisites:  # @viz init
            after[b].append(a)  # @viz init
        state = [0] * numCourses  # 0 = not visited, 1 = on the current path, 2 = finished, no cycle  # @viz init
        def has_cycle(c):  # @viz visit
            if state[c] == 1:  # back to a course still on the path: a cycle  # @viz back
                return True  # @viz back
            if state[c] == 2:  # already checked  # @viz seen
                return False  # @viz seen
            state[c] = 1  # @viz visit
            for nxt in after[c]:  # @viz edge
                if has_cycle(nxt):  # @viz edge
                    return True  # @viz edge
            state[c] = 2  # every path from c is cycle-free  # @viz finish
            return False  # @viz finish
        return not any(has_cycle(c) for c in range(numCourses))  # @viz return
