class Solution(object):
    def canCompleteCircuit(self, gas, cost):
        run = 0  # gas left after leaving station i, if we started at 0 with no limit  # @viz init
        low, low_at = 0, -1  # the lowest point so far (0 before any station)  # @viz init
        for i in range(len(gas)):  # @viz loop
            run += gas[i] - cost[i]  # @viz loop
            if run < low:  # a new lowest point  # @viz low
                low, low_at = run, i  # @viz low
        # Start right after the lowest point: from there, the tank never drops below what
        # it had at the start, so it never goes negative.
        return low_at + 1 if run >= 0 else -1  # @viz return
