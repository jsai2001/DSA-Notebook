import java.util.*;
class Solution {
    private int[][] memo;
    private int[] p;
    public int maxProfit(int[] prices) {
        p = prices; // @viz init
        memo = new int[prices.length][2]; // memo[i][holding], -1 = not yet // @viz init
        for (int[] row : memo) Arrays.fill(row, -1); // @viz init
        return best(0, 0); // @viz return
    }
    private int best(int i, int holding) { // the most profit from day i on, holding a share or not // @viz call
        if (i >= p.length) return 0; // no days left // @viz base
        if (memo[i][holding] >= 0) return memo[i][holding]; // @viz memo
        if (holding == 1) memo[i][1] = Math.max(p[i] + best(i + 2, 0), best(i + 1, 1)); // sell today (then cool down: skip to i + 2), or keep holding // @viz sell
        else memo[i][0] = Math.max(-p[i] + best(i + 1, 1), best(i + 1, 0)); // buy today, or wait // @viz buy
        return memo[i][holding]; // @viz memo
    }
}
