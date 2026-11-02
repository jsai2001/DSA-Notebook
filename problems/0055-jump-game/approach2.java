class Solution {
    public boolean canJump(int[] nums) {
        int goal = nums.length - 1; // the leftmost index known to reach the end // @viz init
        for (int i = goal - 1; i >= 0; i--) { // right to left // @viz scan
            if (i + nums[i] >= goal) { // i can land on goal: any jump up to nums[i] is allowed // @viz scan
                goal = i; // so reaching i is enough // @viz move
            }
        }
        return goal == 0; // @viz return
    }
}
