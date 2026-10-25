import statistics

class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        return float(statistics.median(nums1 + nums2))
