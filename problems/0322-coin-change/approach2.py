from collections import deque
class Solution(object):
    def coinChange(self, coins, amount):
        if amount == 0:  # @viz base
            return 0  # @viz base
        seen = [False] * (amount + 1)  # amounts already reached with fewer coins  # @viz init
        seen[0] = True  # @viz init
        queue = deque([0])  # @viz init
        steps = 0  # coins used so far: one BFS level per coin  # @viz init
        while queue:  # @viz level
            steps += 1  # @viz level
            for _ in range(len(queue)):  # @viz level
                a = queue.popleft()  # @viz add
                for c in coins:  # add one more coin  # @viz add
                    b = a + c  # @viz add
                    if b == amount:  # the first time it's reached is with the fewest coins  # @viz found
                        return steps  # @viz found
                    if b < amount and not seen[b]:  # @viz add
                        seen[b] = True  # @viz add
                        queue.append(b)  # @viz add
        return -1  # @viz none
