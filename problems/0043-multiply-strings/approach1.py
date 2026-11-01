class Solution(object):
    def multiply(self, num1, num2):
        if num1 == "0" or num2 == "0":  # anything times 0 is "0", not "000"  # @viz zero
            return "0"  # @viz zero
        total = "0"  # @viz init
        for k, d in enumerate(reversed(num2)):  # one digit of num2 at a time, from the right  # @viz digit
            if d == "0":  # a zero digit adds nothing  # @viz digit
                continue  # @viz digit
            row = self.times_digit(num1, int(d)) + "0" * k  # num1 × digit, shifted k places  # @viz row
            total = self.add(total, row)  # @viz add
        return total  # @viz return

    def times_digit(self, num, d):  # a whole number times one digit (1-9)
        out, carry = [], 0
        for ch in reversed(num):
            carry, digit = divmod(int(ch) * d + carry, 10)
            out.append(str(digit))
        if carry:
            out.append(str(carry))
        return "".join(reversed(out))

    def add(self, a, b):  # two numbers as strings (Add Strings, LeetCode 415)
        out, carry = [], 0
        i, j = len(a) - 1, len(b) - 1
        while i >= 0 or j >= 0 or carry:
            s = carry + (int(a[i]) if i >= 0 else 0) + (int(b[j]) if j >= 0 else 0)
            carry, digit = divmod(s, 10)
            out.append(str(digit))
            i, j = i - 1, j - 1
        return "".join(reversed(out))
