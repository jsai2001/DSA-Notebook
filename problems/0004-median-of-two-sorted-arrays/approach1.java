class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length, n = nums2.length; // @viz setup
        int[] result = new int[m + n]; // @viz init
        int i = 0, j = 0, k = 0; // @viz init

        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) result[k++] = nums1[i++]; // @viz take1, takeboth
            else result[k++] = nums2[j++]; // @viz take2
        }
        while (i < m) result[k++] = nums1[i++]; // @viz rest
        while (j < n) result[k++] = nums2[j++]; // @viz rest

        int mid = (m + n) / 2; // @viz median
        if ((m + n) % 2 == 0) { // @viz median
            return (result[mid - 1] + result[mid]) / 2.0; // @viz median
        }
        return result[mid]; // @viz median
    }
}
