class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        m, n = len(nums1), len(nums2)  # @viz init
        total = m + n  # @viz init
        i = j = 0  # @viz init
        prev = curr = 0  # @viz init
        for _ in range(total // 2 + 1):  # @viz step
            prev = curr  # @viz step
            if i < m and (j >= n or nums1[i] <= nums2[j]):  # @viz take1, take2
                curr = nums1[i]  # @viz take1
                i += 1  # @viz take1
            else:  # @viz take2
                curr = nums2[j]  # @viz take2
                j += 1  # @viz take2
        if total % 2 == 0:  # @viz even, odd
            return (prev + curr) / 2.0  # @viz even
        return float(curr)  # @viz odd
