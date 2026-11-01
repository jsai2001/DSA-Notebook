class Solution(object):
    def multiply(self, num1, num2):
        if num1 == "0" or num2 == "0":  # anything times 0 is "0", not "000"  # @viz zero
            return "0"  # @viz zero
        a = [int(c) for c in reversed(num1)]  # ones digit first  # @viz init
        b = [int(c) for c in reversed(num2)]  # @viz init
        col = [0] * (len(a) + len(b))  # col[k]: sum of every a[i] * b[j] with i + j = k  # @viz init
        for i, x in enumerate(a):  # @viz sum
            for j, y in enumerate(b):  # @viz sum
                col[i + j] += x * y  # no carrying yet  # @viz sum
        carry = 0  # @viz carry
        for k in range(len(col)):  # one carry pass, from the ones place up  # @viz carry
            carry, col[k] = divmod(col[k] + carry, 10)  # @viz carry
        while col[-1] == 0:  # drop the unused top place  # @viz trim
            col.pop()  # @viz trim
        return "".join(map(str, reversed(col)))  # @viz return
