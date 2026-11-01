class Solution(object):
    def multiply(self, num1, num2):
        if num1 == "0" or num2 == "0":  # anything times 0 is "0", not "000"  # @viz zero
            return "0"  # @viz zero
        m, n = len(num1), len(num2)
        pos = [0] * (m + n)  # the product has at most m + n digits; pos[0] is the leftmost  # @viz init
        for i in range(m - 1, -1, -1):  # @viz mul
            for j in range(n - 1, -1, -1):  # @viz mul
                # num1[i] × num2[j] lands on places i + j and i + j + 1
                total = int(num1[i]) * int(num2[j]) + pos[i + j + 1]  # @viz mul
                pos[i + j + 1] = total % 10  # keep one digit here  # @viz place
                pos[i + j] += total // 10  # carry one place to the left  # @viz place
        return "".join(map(str, pos)).lstrip("0")  # only pos[0] can be a leading zero  # @viz return
