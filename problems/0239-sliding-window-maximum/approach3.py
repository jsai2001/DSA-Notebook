from collections import deque
class Solution(object):
    def maxSlidingWindow(self, nums, k):
        dq = deque()  # indexes whose values go down from front to back; the front is the window's max  # @viz init
        res = []  # @viz init
        for i, x in enumerate(nums):  # @viz step
            while dq and nums[dq[-1]] <= x:  # smaller values behind x can never be a max again  # @viz pop
                dq.pop()  # @viz pop
            dq.append(i)  # @viz push
            if dq[0] <= i - k:  # the front slid out of the window  # @viz out
                dq.popleft()  # @viz out
            if i >= k - 1:  # @viz record
                res.append(nums[dq[0]])  # @viz record
        return res  # @viz return
