import java.util.*;
class Solution {
    public int coinChange(int[] coins, int amount) {
        int INF = amount + 1; // more coins than could ever be needed: stands for "impossible" // @viz init
        int[] dp = new int[amount + 1]; // dp[a] = the fewest coins that make a // @viz init
        Arrays.fill(dp, INF); // @viz init
        dp[0] = 0; // @viz init
        for (int a = 1; a <= amount; a++) // smallest amounts first // @viz amount
            for (int c : coins) // @viz try
                if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1); // use c as the last coin // @viz try
        return dp[amount] <= amount ? dp[amount] : -1; // @viz return
    }
}
