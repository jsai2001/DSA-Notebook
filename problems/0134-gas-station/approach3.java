class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int run = 0; // gas left after leaving station i, if we started at 0 with no limit // @viz init
        int low = 0, lowAt = -1; // the lowest point so far (0 before any station) // @viz init
        for (int i = 0; i < gas.length; i++) { // @viz loop
            run += gas[i] - cost[i]; // @viz loop
            if (run < low) { // a new lowest point // @viz low
                low = run; // @viz low
                lowAt = i; // @viz low
            }
        }
        // Start right after the lowest point: from there, the tank never drops below what
        // it had at the start, so it never goes negative.
        return run >= 0 ? lowAt + 1 : -1; // @viz return
    }
}
