class Solution {
    public boolean canJump(int[] nums) {
        int farthest = 0; // the furthest index reachable so far // @viz init
        for (int i = 0; i < nums.length; i++) { // @viz scan
            if (i > farthest) return false; // nothing before i can jump this far: stuck // @viz stuck
            farthest = Math.max(farthest, i + nums[i]); // i is reachable, so so is everything up to i + nums[i] // @viz reach
        }
        return true; // @viz return
    }
}
