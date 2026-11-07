import java.util.*;
class Solution {
    private int[] memo;
    public int rob(int[] nums) {
        memo = new int[nums.length]; // i -> the most you can take from houses i, i + 1, ... (-1 = not known yet) // @viz init
        Arrays.fill(memo, -1); // @viz init
        return best(nums, 0); // @viz answer
    }
    private int best(int[] nums, int i) { // @viz call
        if (i >= nums.length) return 0; // no houses left // @viz base
        if (memo[i] < 0) // @viz memo
            memo[i] = Math.max(best(nums, i + 1), nums[i] + best(nums, i + 2)); // skip house i, or rob it and skip i + 1 // @viz choose
        return memo[i]; // @viz memo
    }
}
