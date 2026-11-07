class Solution {
    public int maxProduct(int[] nums) {
        int best = nums[0]; // not 0: the answer can be negative // @viz init
        for (int i = 0; i < nums.length; i++) { // every start // @viz start
            int prod = 1; // every subarray product fits in 32 bits (given) // @viz start
            for (int j = i; j < nums.length; j++) { // extend to every end, keeping a running product // @viz extend
                prod *= nums[j]; // @viz extend
                best = Math.max(best, prod); // @viz best
            }
        }
        return best; // @viz return
    }
}
