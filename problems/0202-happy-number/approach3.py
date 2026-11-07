class Solution(object):
    def isHappy(self, n):
        def nxt(x):  # the sum of the squares of the digits
            total = 0
            while x:
                x, d = divmod(x, 10)
                total += d * d
            return total
        slow, fast = n, nxt(n)  # fast moves two steps for each step of slow  # @viz init
        while fast != 1 and slow != fast:  # either fast reaches 1, or it laps slow inside a loop  # @viz loop
            slow = nxt(slow)  # @viz move
            fast = nxt(nxt(fast))  # @viz move
        return fast == 1  # @viz return
