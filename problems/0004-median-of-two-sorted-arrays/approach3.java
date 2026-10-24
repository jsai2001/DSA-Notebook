class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.length, n = nums2.length;
        int half = (m + n + 1) / 2;
        int lo = 0, hi = m;

        while (lo <= hi) {
            int i = lo + (hi - lo) / 2;
            int j = half - i;

            int L1 = (i > 0) ? nums1[i - 1] : Integer.MIN_VALUE;
            int R1 = (i < m) ? nums1[i] : Integer.MAX_VALUE;
            int L2 = (j > 0) ? nums2[j - 1] : Integer.MIN_VALUE;
            int R2 = (j < n) ? nums2[j] : Integer.MAX_VALUE;

            if (L1 > R2) {
                hi = i - 1;
            } else if (L2 > R1) {
                lo = i + 1;
            } else {
                if ((m + n) % 2 == 1) return Math.max(L1, L2);
                return (Math.max(L1, L2) + (double) Math.min(R1, R2)) / 2.0;
            }
        }
        return 0.0; // unreachable for valid input
    }
}
