class Solution {
    public int findDuplicate(int[] nums) {
        boolean[] seen = new boolean[nums.length]; // values are 1..n, so an array of flags works as the set // @viz init
        for (int x : nums) { // @viz loop
            if (seen[x]) return x; // met before // @viz found
            seen[x] = true; // @viz add
        }
        return -1; // not reached
    }
}
