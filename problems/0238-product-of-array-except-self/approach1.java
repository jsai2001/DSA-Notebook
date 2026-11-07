class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length; // @viz init
        int[] ans = new int[n]; // @viz init
        for (int i = 0; i < n; i++) { // @viz each
            int p = 1; // @viz each
            for (int j = 0; j < n; j++) // multiply everything except nums[i] // @viz mult
                if (j != i) p *= nums[j]; // @viz mult
            ans[i] = p; // @viz store
        }
        return ans; // @viz return
    }
}
