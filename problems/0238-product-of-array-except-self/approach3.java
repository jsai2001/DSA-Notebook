class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length; // @viz init
        int[] ans = new int[n]; // @viz init
        ans[0] = 1; // @viz init
        for (int i = 1; i < n; i++) ans[i] = ans[i - 1] * nums[i - 1]; // first pass: ans[i] = the product of everything before i // @viz left
        int right = 1; // the product of everything after i, kept in one number // @viz right
        for (int i = n - 1; i >= 0; i--) { // second pass, from the back // @viz right
            ans[i] *= right; // @viz right
            right *= nums[i]; // @viz right
        }
        return ans; // @viz return
    }
}
