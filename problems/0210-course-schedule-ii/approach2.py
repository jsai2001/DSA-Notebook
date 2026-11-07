import sys
sys.setrecursionlimit(10000)  # a chain of 2000 courses is 2000 calls deep
class Solution(object):
    def findOrder(self, numCourses, prerequisites):
        after = [[] for _ in range(numCourses)]  # after[b] = courses that need b  # @viz init
        for a, b in prerequisites:  # @viz init
            after[b].append(a)  # @viz init
        state = [0] * numCourses  # 0 = not visited, 1 = on the current path, 2 = finished  # @viz init
        post = []  # courses in the order they finish: every course after c finishes before c  # @viz init
        def dfs(c):  # True if a cycle is found  # @viz visit
            if state[c] == 1:  # back on the current path: a cycle  # @viz back
                return True  # @viz back
            if state[c] == 2:  # @viz seen
                return False  # @viz seen
            state[c] = 1  # @viz visit
            for nxt in after[c]:  # @viz edge
                if dfs(nxt):  # @viz edge
                    return True  # @viz edge
            state[c] = 2  # @viz finish
            post.append(c)  # @viz finish
            return False  # @viz finish
        for c in range(numCourses):  # @viz loop
            if dfs(c):  # @viz loop
                return []  # @viz loop
        return post[::-1]  # reversed finish order: each course before everything that needs it  # @viz return
