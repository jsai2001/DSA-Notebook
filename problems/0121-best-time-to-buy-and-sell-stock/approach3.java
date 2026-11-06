class Solution {
    public int maxProfit(int[] prices) {
        int lowest = Integer.MAX_VALUE; // the cheapest price before today // @viz init
        int best = 0; // @viz init
        for (int p : prices) { // @viz loop
            best = Math.max(best, p - lowest); // sell today, having bought at the cheapest day before (day 0: p - MAX_VALUE is negative, no overflow) // @viz profit
            lowest = Math.min(lowest, p); // today may be the cheapest day for later sales // @viz low
        }
        return best; // @viz return
    }
}
