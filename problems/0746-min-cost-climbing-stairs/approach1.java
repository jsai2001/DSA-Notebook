import java.util.*;
class Solution {
    private int[] memo;
    public int minCostClimbingStairs(int[] cost) {
        memo = new int[cost.length + 1]; // @viz init
        Arrays.fill(memo, -1); // @viz init
        return reach(cost, cost.length); // @viz return
    }
    private int reach(int[] cost, int i) { // the cheapest way to stand on step i (step n is the top) // @viz call
        if (i <= 1) return 0; // you may start on step 0 or step 1 for free // @viz base
        if (memo[i] < 0) // @viz memo
            memo[i] = Math.min(reach(cost, i - 1) + cost[i - 1], reach(cost, i - 2) + cost[i - 2]); // come from one step below, or two // @viz choose
        return memo[i]; // @viz memo
    }
}
