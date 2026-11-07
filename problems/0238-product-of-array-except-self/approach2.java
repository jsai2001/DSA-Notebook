class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length; // @viz init
        int[] left = new int[n], right = new int[n], ans = new int[n]; // left[i]: product before i; right[i]: product after i // @viz init
        left[0] = 1; // @viz left
        for (int i = 1; i < n; i++) left[i] = left[i - 1] * nums[i - 1]; // @viz left
        right[n - 1] = 1; // @viz right
        for (int i = n - 2; i >= 0; i--) right[i] = right[i + 1] * nums[i + 1]; // @viz right
        for (int i = 0; i < n; i++) ans[i] = left[i] * right[i]; // before i times after i: everything but nums[i] // @viz combine
        return ans; // @viz combine
    }
}
