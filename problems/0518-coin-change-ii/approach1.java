class Solution {
    private Integer[][] memo; // memo[i][rem] = ways to make rem using coins[i..]; null = not yet

    public int change(int amount, int[] coins) {
        memo = new Integer[coins.length][amount + 1]; // @viz init
        return ways(0, amount, coins); // @viz return
    }

    private int ways(int i, int rem, int[] coins) { // @viz call
        if (rem == 0) return 1; // @viz done
        if (rem < 0 || i == coins.length) return 0; // @viz dead
        if (memo[i][rem] != null) return memo[i][rem]; // @viz hit
        // take coins[i] (and stay on it), or skip to the next coin
        memo[i][rem] = ways(i, rem - coins[i], coins) + ways(i + 1, rem, coins); // @viz split
        return memo[i][rem]; // @viz store
    }
}
