class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int total = 0, tank = 0, start = 0; // |total| <= 10^5 * 10^4 = 10^9: fits in int // @viz init
        for (int i = 0; i < gas.length; i++) { // @viz loop
            int gain = gas[i] - cost[i]; // @viz loop
            total += gain; // @viz loop
            tank += gain; // @viz loop
            if (tank < 0) { // can't reach i + 1 from start, or from any station in between // @viz reset
                start = i + 1; // @viz reset
                tank = 0; // @viz reset
            }
        }
        return total >= 0 ? start : -1; // enough gas overall? // @viz return
    }
}
