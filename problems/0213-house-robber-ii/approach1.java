import java.util.*;
class Solution {
    private int[] memo;
    public int rob(int[] nums) {
        int n = nums.length; // @viz init
        if (n == 1) return nums[0]; // one house: it has no neighbours // @viz one
        return Math.max(bestRange(nums, 0, n - 2), bestRange(nums, 1, n - 1)); // the first and last houses touch: leave out one of them // @viz answer
    }
    private int bestRange(int[] nums, int lo, int hi) { // House Robber on nums[lo..hi], with a memo // @viz range
        memo = new int[nums.length]; // @viz range
        Arrays.fill(memo, -1); // @viz range
        return best(nums, lo, hi); // @viz range
    }
    private int best(int[] nums, int i, int hi) { // the most from houses i..hi // @viz call
        if (i > hi) return 0; // @viz base
        if (memo[i] < 0) // @viz memo
            memo[i] = Math.max(best(nums, i + 1, hi), nums[i] + best(nums, i + 2, hi)); // skip house i, or rob it // @viz choose
        return memo[i]; // @viz memo
    }
}
