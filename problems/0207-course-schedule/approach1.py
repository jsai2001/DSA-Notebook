class Solution(object):
    def canFinish(self, numCourses, prerequisites):
        done = [False] * numCourses  # @viz init
        left = numCourses  # @viz init
        while left:  # one round: take every course whose prerequisites are all done  # @viz round
            need = [0] * numCourses  # prerequisites not done yet, per course  # @viz count
            for a, b in prerequisites:  # b must come before a  # @viz count
                if not done[b]:  # @viz count
                    need[a] += 1  # @viz count
            ready = [c for c in range(numCourses) if not done[c] and need[c] == 0]  # @viz ready
            if not ready:  # courses are left, but each waits on another: a cycle  # @viz stuck
                return False  # @viz stuck
            for c in ready:  # @viz take
                done[c] = True  # @viz take
            left -= len(ready)  # @viz take
        return True  # @viz return
