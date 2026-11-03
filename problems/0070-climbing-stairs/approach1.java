class Solution {
    private int[] memo;
    public int climbStairs(int n) {
        memo = new int[n + 1]; // memo[k]: ways to climb k steps; 0 = not known yet // @viz init
        return ways(n); // @viz answer
    }
    private int ways(int k) { // @viz call
        if (k <= 2) return k; // 1 step: 1 way; 2 steps: 2 ways (1+1 or 2) // @viz base
        if (memo[k] == 0) { // @viz memo
            memo[k] = ways(k - 1) + ways(k - 2); // the last move was 1 step or 2 steps // @viz add
        }
        return memo[k]; // @viz memo
    }
}
