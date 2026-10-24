class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) { // @viz outer
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) { // @viz check
                    return new int[] { i, j }; // @viz found
                }
            }
        }
        return new int[0]; // @viz notfound
    }
}
