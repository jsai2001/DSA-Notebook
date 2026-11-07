class Solution {
    private boolean pick(int[] nums, int i, int left) { // can some of nums[i:] add up to exactly left? // @viz call
        if (left == 0) return true; // @viz found
        if (i == nums.length || left < 0) return false; // @viz dead
        return pick(nums, i + 1, left - nums[i]) || pick(nums, i + 1, left); // take nums[i], or skip it // @viz call
    }
    public boolean canPartition(int[] nums) {
        int total = 0; // @viz init
        for (int x : nums) total += x; // @viz init
        if (total % 2 != 0) return false; // an odd total can't split into two equal halves // @viz init
        return pick(nums, 0, total / 2); // @viz return
    }
}
