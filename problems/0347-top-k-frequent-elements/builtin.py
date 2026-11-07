from collections import Counter
class Solution(object):
    def topKFrequent(self, nums, k):
        return [x for x, c in Counter(nums).most_common(k)]  # uses a heap when k is given
