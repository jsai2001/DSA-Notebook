class Solution(object):
    def canCompleteCircuit(self, gas, cost):
        n = len(gas)  # @viz init
        for start in range(n):  # @viz start
            tank = 0  # @viz start
            for k in range(n):  # drive n legs from start  # @viz drive
                i = (start + k) % n  # @viz drive
                tank += gas[i] - cost[i]  # fill up at i, drive to i + 1  # @viz drive
                if tank < 0:  # ran dry before the next station  # @viz fail
                    break  # @viz fail
            else:
                return start  # all n legs done  # @viz found
        return -1  # @viz none
