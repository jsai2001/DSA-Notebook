class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        if len(nums1) > len(nums2):  # @viz swap
            nums1, nums2 = nums2, nums1  # binary search the shorter one  # @viz swap
        m, n = len(nums1), len(nums2)  # @viz init
        half = (m + n + 1) // 2  # @viz init
        lo, hi = 0, m  # @viz init

        while lo <= hi:
            i = (lo + hi) // 2      # elements taken from nums1  # @viz cut
            j = half - i            # elements taken from nums2  # @viz cut

            L1 = nums1[i - 1] if i > 0 else float("-inf")  # @viz edges
            R1 = nums1[i] if i < m else float("inf")  # @viz edges
            L2 = nums2[j - 1] if j > 0 else float("-inf")  # @viz edges
            R2 = nums2[j] if j < n else float("inf")  # @viz edges

            if L1 > R2:  # @viz toomany
                hi = i - 1          # took too many from nums1  # @viz toomany
            elif L2 > R1:  # @viz toofew
                lo = i + 1          # took too few from nums1  # @viz toofew
            else:  # @viz found
                if (m + n) % 2:  # @viz odd
                    return float(max(L1, L2))  # @viz odd
                return (max(L1, L2) + min(R1, R2)) / 2.0  # @viz even
