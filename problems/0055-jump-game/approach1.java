class Solution {
    public boolean canJump(int[] nums) {
        int n = nums.length;
        boolean[] good = new boolean[n]; // good[i]: the last index can be reached from i // @viz init
        good[n - 1] = true; // standing on it already counts // @viz init
        for (int i = n - 2; i >= 0; i--) { // right to left, so every good[j] after i is known // @viz from
            int last = Math.min(n - 1, i + nums[i]); // @viz from
            for (int j = i + 1; j <= last; j++) { // every index one jump from i // @viz check
                if (good[j]) { // @viz check
                    good[i] = true; // @viz found
                    break; // one good landing spot is enough // @viz found
                }
            }
        }
        return good[0]; // @viz return
    }
}
