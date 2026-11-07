class Solution {
    public int maxProfit(int[] prices) {
        int hold = -prices[0], sold = 0, rest = 0; // the three states after day 0 // @viz init
        for (int i = 1; i < prices.length; i++) { // @viz day
            int h = Math.max(hold, rest - prices[i]); // all from yesterday's values // @viz day
            int s = hold + prices[i]; // @viz day
            rest = Math.max(rest, sold); // @viz day
            hold = h; // @viz day
            sold = s; // @viz day
        }
        return Math.max(sold, rest); // @viz return
    }
}
