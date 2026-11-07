class Solution(object):
    def topKFrequent(self, nums, k):
        count = {}  # value -> how many times it appears  # @viz count
        for x in nums:  # @viz count
            count[x] = count.get(x, 0) + 1  # @viz count
        bucket = [[] for _ in range(len(nums) + 1)]  # bucket[c] = values seen exactly c times  # @viz bucket
        for x, c in count.items():  # @viz bucket
            bucket[c].append(x)  # @viz bucket
        ans = []  # @viz take
        for c in range(len(nums), 0, -1):  # biggest count first  # @viz take
            for x in bucket[c]:  # @viz take
                ans.append(x)  # @viz take
                if len(ans) == k:  # @viz return
                    return ans  # @viz return
