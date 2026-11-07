class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length; // @viz init
        int[] hold = new int[n], sold = new int[n], rest = new int[n]; // the best money at the end of day i: holding / just sold / free // @viz init
        hold[0] = -prices[0]; // @viz init
        for (int i = 1; i < n; i++) { // @viz day
            hold[i] = Math.max(hold[i - 1], rest[i - 1] - prices[i]); // keep holding, or buy today (only from rest) // @viz day
            sold[i] = hold[i - 1] + prices[i]; // sell what you held // @viz day
            rest[i] = Math.max(rest[i - 1], sold[i - 1]); // stay out, or yesterday was the sale (cooldown ends) // @viz day
        }
        return Math.max(sold[n - 1], rest[n - 1]); // end without a share // @viz return
    }
}
