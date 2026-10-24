class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        m, n = len(nums1), len(nums2)
        total = m + n
        i = j = 0
        prev = curr = 0
        for _ in range(total // 2 + 1):
            prev = curr
            if i < m and (j >= n or nums1[i] <= nums2[j]):
                curr = nums1[i]
                i += 1
            else:
                curr = nums2[j]
                j += 1
        if total % 2 == 0:
            return (prev + curr) / 2.0
        return float(curr)
