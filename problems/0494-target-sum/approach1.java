class Solution {
    private int ways(int[] nums, int target, int i, int total) { // sign choices for nums[i:] that bring total to target // @viz call
        if (i == nums.length) return total == target ? 1 : 0; // every number has a sign // @viz leaf
        return ways(nums, target, i + 1, total + nums[i]) + ways(nums, target, i + 1, total - nums[i]); // + or - // @viz call
    }
    public int findTargetSumWays(int[] nums, int target) {
        return ways(nums, target, 0, 0); // @viz return
    }
}
