class Solution(object):
    def checkValidString(self, s):
        lo = hi = 0  # the fewest and the most "(" that could be open right now  # @viz init
        for c in s:  # @viz loop
            if c == "(":  # @viz open
                lo, hi = lo + 1, hi + 1  # @viz open
            elif c == ")":  # @viz close
                lo, hi = lo - 1, hi - 1  # @viz close
            else:  # "*" could be ")", "" or "("  # @viz star
                lo, hi = lo - 1, hi + 1  # @viz star
            if hi < 0:  # even treating every "*" as "(" there are too many ")"  # @viz fail
                return False  # @viz fail
            lo = max(lo, 0)  # a count can't go below 0: drop the choices that would  # @viz clamp
        return lo == 0  # some choice closes everything  # @viz return
