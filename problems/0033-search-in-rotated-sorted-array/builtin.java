import java.util.Arrays;
class Solution {
    public int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) { // find where the rotation starts (the smallest value)
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        // nums[0..lo-1] holds the values >= nums[0]; nums[lo..] holds the smaller ones
        boolean left = lo > 0 && target >= nums[0];
        int i = left ? Arrays.binarySearch(nums, 0, lo, target) // the library's binary search on that part
                     : Arrays.binarySearch(nums, lo, nums.length, target);
        return i >= 0 ? i : -1; // a negative result means "not found"
    }
}
