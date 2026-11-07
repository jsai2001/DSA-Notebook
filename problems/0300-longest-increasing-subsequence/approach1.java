class Solution {
    private int[] memo;
    public int lengthOfLIS(int[] nums) {
        memo = new int[nums.length]; // 0 = not worked out yet // @viz init
        int ans = 0; // @viz return
        for (int i = 0; i < nums.length; i++) ans = Math.max(ans, longest(nums, i)); // it can start anywhere // @viz return
        return ans; // @viz return
    }
    private int longest(int[] nums, int i) { // the longest increasing subsequence that starts with nums[i] // @viz call
        if (memo[i] != 0) return memo[i]; // @viz memo
        int best = 1; // nums[i] alone // @viz memo
        for (int j = i + 1; j < nums.length; j++) // try every bigger value after it as the next one // @viz try
            if (nums[j] > nums[i]) best = Math.max(best, 1 + longest(nums, j)); // @viz try
        return memo[i] = best; // @viz store
    }
}
