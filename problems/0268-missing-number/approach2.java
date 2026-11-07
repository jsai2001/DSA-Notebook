class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length; // @viz set
        boolean[] seen = new boolean[n + 1]; // the values are 0..n, so an array works as the set // @viz set
        for (int x : nums) seen[x] = true; // @viz set
        for (int x = 0; x <= n; x++) // try 0, 1, ..., n // @viz check
            if (!seen[x]) return x; // @viz found
        return -1; // not reached
    }
}
