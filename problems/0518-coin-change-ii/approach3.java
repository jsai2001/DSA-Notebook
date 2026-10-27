class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1]; // dp[a] = ways to make a // @viz init
        dp[0] = 1; // one way to make 0: use nothing // @viz init
        for (int coin : coins) { // coins outside, so each combination is counted once // @viz coin
            for (int a = coin; a <= amount; a++) { // @viz cell
                dp[a] += dp[a - coin]; // add the ways that end with this coin // @viz add
            }
        }
        return dp[amount]; // @viz return
    }
}
