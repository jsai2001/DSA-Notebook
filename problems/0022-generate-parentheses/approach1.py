class Solution(object):
    def generateParenthesis(self, n):
        result = []  # @viz init
        for mask in range(1 << (2 * n)):  # every string of 2n brackets: bit k set = '(' at position k  # @viz loop
            s = "".join("(" if mask >> k & 1 else ")" for k in range(2 * n))  # @viz build
            balance = 0  # @viz check
            for ch in s:  # @viz check
                balance += 1 if ch == "(" else -1  # @viz check
                if balance < 0:  # a ')' with no '(' before it to close  # @viz check
                    break  # @viz check
            if balance == 0:  # never went below 0 and ended at 0: valid  # @viz keep
                result.append(s)  # @viz keep
        return result  # @viz return
