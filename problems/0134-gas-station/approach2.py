class Solution(object):
    def canCompleteCircuit(self, gas, cost):
        total = tank = start = 0  # @viz init
        for i in range(len(gas)):  # @viz loop
            gain = gas[i] - cost[i]  # @viz loop
            total += gain  # @viz loop
            tank += gain  # @viz loop
            if tank < 0:  # can't reach i + 1 from start, or from any station in between  # @viz reset
                start = i + 1  # @viz reset
                tank = 0  # @viz reset
        return start if total >= 0 else -1  # enough gas overall?  # @viz return
