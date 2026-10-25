import java.util.stream.IntStream;

class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int[] all = IntStream.concat(IntStream.of(nums1), IntStream.of(nums2))
                .sorted()
                .toArray();
        int mid = all.length / 2;
        return all.length % 2 == 1 ? all[mid] : (all[mid - 1] + all[mid]) / 2.0;
    }
}
