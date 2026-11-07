class Solution(object):
    def carFleet(self, target, position, speed):
        cars = sorted(zip(position, speed), reverse=True)  # closest to the target first  # @viz init
        stack = []  # arrival time of each fleet's front car  # @viz init
        for p, s in cars:  # @viz push
            stack.append(float(target - p) / s)  # @viz push
            if len(stack) >= 2 and stack[-1] <= stack[-2]:  # it would arrive no later than the fleet ahead: it joins  # @viz merge
                stack.pop()  # @viz merge
        return len(stack)  # @viz return
