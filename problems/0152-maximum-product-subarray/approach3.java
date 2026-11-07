class Solution {
    public int maxProduct(int[] nums) {
        int hi = nums[0], lo = nums[0], best = nums[0]; // largest and smallest product ending here // @viz init
        for (int i = 1; i < nums.length; i++) { // @viz loop
            int x = nums[i]; // @viz loop
            if (x < 0) { // a negative number turns the largest into the smallest, and back // @viz swap
                int t = hi; // @viz swap
                hi = lo; // @viz swap
                lo = t; // @viz swap
            }
            hi = Math.max(x, hi * x); // start fresh at x, or extend // @viz update
            lo = Math.min(x, lo * x); // @viz update
            best = Math.max(best, hi); // @viz best
        }
        return best; // @viz return
    }
}
