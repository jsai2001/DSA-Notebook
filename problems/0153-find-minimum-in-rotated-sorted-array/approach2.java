class Solution {
    public int findMin(int[] nums) {
        if (nums[0] <= nums[nums.length - 1]) return nums[0]; // not rotated (or one number): the first is smallest // @viz sorted
        // Rotated: the minimum is the first number smaller than nums[0].
        int lo = 1, hi = nums.length - 1; // @viz init
        while (lo < hi) { // @viz loop
            int mid = lo + (hi - lo) / 2; // @viz mid
            if (nums[mid] >= nums[0]) { // still in the left part: the drop is after mid // @viz right
                lo = mid + 1; // @viz right
            } else { // mid is after the drop: the minimum is mid or before it // @viz left
                hi = mid; // @viz left
            }
        }
        return nums[lo]; // @viz return
    }
}
