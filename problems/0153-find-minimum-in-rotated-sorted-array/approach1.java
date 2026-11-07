class Solution {
    public int findMin(int[] nums) {
        int best = nums[0]; // @viz init
        for (int x : nums) { // look at every number // @viz scan
            if (x < best) best = x; // @viz scan
        }
        return best; // @viz return
    }
}
