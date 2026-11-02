class Solution {
    public int maxSubArray(int[] nums) {
        int best = nums[0]; // not 0: every number may be negative // @viz init
        for (int i = 0; i < nums.length; i++) { // every start // @viz start
            int total = 0; // @viz start
            for (int j = i; j < nums.length; j++) { // every end, adding one number at a time // @viz extend
                total += nums[j]; // sum of nums[i..j] // @viz extend
                best = Math.max(best, total); // @viz extend
            }
        }
        return best; // @viz return
    }
}
