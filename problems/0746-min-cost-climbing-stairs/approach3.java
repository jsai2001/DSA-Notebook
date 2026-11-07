class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int two = 0, one = 0; // the cheapest way to stand two steps below, and one step below // @viz init
        for (int i = 2; i <= cost.length; i++) { // @viz loop
            int cur = Math.min(one + cost[i - 1], two + cost[i - 2]); // @viz choose
            two = one; // @viz choose
            one = cur; // @viz choose
        }
        return one; // @viz return
    }
}
