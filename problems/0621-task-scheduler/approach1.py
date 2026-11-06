class Solution(object):
    def leastInterval(self, tasks, n):
        left = [0] * 26  # how many of each letter are still to run  # @viz init
        for t in tasks:  # @viz init
            left[ord(t) - 65] += 1  # @viz init
        ready = [0] * 26  # the first time each letter may run again  # @viz init
        time = 0  # @viz init
        remaining = len(tasks)  # @viz init
        while remaining:  # one loop per time unit  # @viz tick
            pick = -1  # @viz pick
            for c in range(26):  # of the letters allowed now, the one with the most left  # @viz pick
                if left[c] and ready[c] <= time and (pick < 0 or left[c] > left[pick]):  # @viz pick
                    pick = c  # @viz pick
            if pick >= 0:  # run it, then it must wait n units  # @viz run
                left[pick] -= 1  # @viz run
                ready[pick] = time + n + 1  # @viz run
                remaining -= 1  # @viz run
            time += 1  # nothing allowed: this unit is idle  # @viz idle
        return time  # @viz return
