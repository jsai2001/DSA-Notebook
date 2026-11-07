class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) // check every value, left to right // @viz scan
            if (nums[i] == target) return i; // @viz found
        return -1; // @viz none
    }
}
