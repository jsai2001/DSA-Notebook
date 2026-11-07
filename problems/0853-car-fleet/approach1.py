class Solution(object):
    def carFleet(self, target, position, speed):
        n = len(position)  # @viz init
        time = [float(target - position[i]) / speed[i] for i in range(n)]  # when each car would arrive alone  # @viz init
        fleets = 0  # @viz init
        for i in range(n):  # is car i the front of its fleet?  # @viz car
            caught = False  # @viz car
            for j in range(n):  # @viz check
                if position[j] > position[i] and time[j] >= time[i]:  # a car ahead arrives no sooner: i catches it  # @viz check
                    caught = True  # @viz check
                    break  # @viz check
            if not caught:  # nothing ahead slows it down: a new fleet  # @viz lead
                fleets += 1  # @viz lead
        return fleets  # @viz return
