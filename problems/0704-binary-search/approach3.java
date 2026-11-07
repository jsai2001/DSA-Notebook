class Solution {
    public int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1; // target, if present, is in nums[lo..hi] // @viz init
        while (lo <= hi) { // @viz mid
            int mid = lo + (hi - lo) / 2; // lo + hi could overflow for huge arrays; this can't // @viz mid
            if (nums[mid] == target) return mid; // @viz found
            if (nums[mid] < target) lo = mid + 1; // too small: drop mid and everything left of it // @viz right
            else hi = mid - 1; // too big: drop mid and everything right of it // @viz left
        }
        return -1; // @viz none
    }
}
