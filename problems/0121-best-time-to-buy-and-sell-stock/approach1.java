class Solution {
    public int maxProfit(int[] prices) {
        int best = 0; // not trading at all makes 0 // @viz init
        for (int i = 0; i < prices.length; i++) // buy on day i // @viz buy
            for (int j = i + 1; j < prices.length; j++) // sell on a later day j // @viz sell
                best = Math.max(best, prices[j] - prices[i]); // @viz profit
        return best; // @viz return
    }
}
