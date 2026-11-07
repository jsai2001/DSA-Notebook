class Solution {
    public int maxProduct(int[] nums) {
        int n = nums.length; // @viz init
        int best = nums[0]; // @viz init
        int left = 1, right = 1; // @viz init
        for (int i = 0; i < n; i++) { // @viz scan
            // A product restarts after a 0 (multiplying by 0 would stick at 0).
            left = (left != 0 ? left : 1) * nums[i]; // from the left: the prefix ending at i // @viz scan
            right = (right != 0 ? right : 1) * nums[n - 1 - i]; // from the right: the suffix starting at n-1-i // @viz scan
            best = Math.max(best, Math.max(left, right)); // @viz best
        }
        return best; // @viz return
    }
}
