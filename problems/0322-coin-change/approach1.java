import java.util.*;
class Solution {
    private int[] c, memo;
    public int coinChange(int[] coins, int amount) {
        c = coins; // @viz init
        memo = new int[amount + 1]; // -2 = not worked out yet, -1 = impossible // @viz init
        Arrays.fill(memo, -2); // @viz init
        return fewest(amount); // @viz return
    }
    private int fewest(int a) { // the fewest coins that add up to a, or -1 // @viz call
        if (a == 0) return 0; // @viz base
        if (memo[a] != -2) return memo[a]; // @viz memo
        int best = Integer.MAX_VALUE; // @viz try
        for (int coin : c) // the last coin is one of coins // @viz try
            if (coin <= a) { // @viz try
                int r = fewest(a - coin); // @viz try
                if (r >= 0) best = Math.min(best, r + 1); // @viz try
            }
        return memo[a] = best == Integer.MAX_VALUE ? -1 : best; // @viz memo
    }
}
