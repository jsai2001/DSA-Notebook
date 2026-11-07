class Solution(object):
    def carFleet(self, target, position, speed):
        cars = sorted(zip(position, speed), reverse=True)  # closest to the target first  # @viz init
        fleets, slowest = 0, 0.0  # slowest: arrival time of the fleet just ahead  # @viz init
        for p, s in cars:  # @viz car
            t = float(target - p) / s  # @viz car
            if t > slowest:  # it can't catch the fleet ahead: a new fleet  # @viz lead
                fleets += 1  # @viz lead
                slowest = t  # @viz lead
        return fleets  # @viz return
