from collections import deque
class Solution(object):
    def jump(self, nums):
        n = len(nums)
        dist = [0] * n  # dist[i]: jumps used to reach i  # @viz init
        queue = deque([0])  # @viz init
        reached = 0  # the furthest index already in the queue  # @viz init
        while queue:  # @viz pop
            i = queue.popleft()  # indices come out in order of jumps used  # @viz pop
            if i == n - 1:  # the first time the last index comes out is the fewest jumps  # @viz done
                return dist[i]  # @viz done
            for j in range(reached + 1, min(n - 1, i + nums[i]) + 1):  # only indices nobody has queued yet  # @viz push
                dist[j] = dist[i] + 1  # @viz push
                queue.append(j)  # @viz push
            reached = max(reached, i + nums[i])  # @viz push
