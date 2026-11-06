class Solution {
    public int maxProfit(int[] prices) {
        int best = 0; // @viz init
        int buy = 0; // the buy day: the cheapest day seen so far // @viz init
        for (int sell = 1; sell < prices.length; sell++) { // the sell day moves right one day at a time // @viz sell
            if (prices[sell] < prices[buy]) { // a cheaper day: buying here beats any earlier buy // @viz move
                buy = sell; // @viz move
            } else { // @viz profit
                best = Math.max(best, prices[sell] - prices[buy]); // @viz profit
            }
        }
        return best; // @viz return
    }
}
