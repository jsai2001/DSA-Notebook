class Solution {
    public int missingNumber(int[] nums) {
        int res = nums.length; // start with n, the one index that has no slot // @viz init
        for (int i = 0; i < nums.length; i++) // @viz xor
            res ^= i ^ nums[i]; // every number that's present appears twice (as an index and a value) and cancels // @viz xor
        return res; // only the missing one is left // @viz return
    }
}
