class Solution(object):
    def findOrder(self, numCourses, prerequisites):
        done = [False] * numCourses  # @viz init
        order = []  # @viz init
        while len(order) < numCourses:  # one round: take every course whose prerequisites are all done  # @viz round
            need = [0] * numCourses  # prerequisites not done yet, per course  # @viz count
            for a, b in prerequisites:  # b must come before a  # @viz count
                if not done[b]:  # @viz count
                    need[a] += 1  # @viz count
            ready = [c for c in range(numCourses) if not done[c] and need[c] == 0]  # @viz ready
            if not ready:  # courses are left, but each waits on another: a cycle  # @viz stuck
                return []  # @viz stuck
            for c in ready:  # @viz take
                done[c] = True  # @viz take
                order.append(c)  # @viz take
        return order  # @viz return
