class Solution(object):
    def letterCombinations(self, digits):
        if not digits:  # no digits: no combinations (not [""])  # @viz empty
            return []  # @viz empty
        letters = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl",  # @viz init
                   "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}  # @viz init
        combos = [""]  # one way to spell nothing so far  # @viz init
        for d in digits:  # @viz digit
            # every combination so far, extended by every letter of this digit
            combos = [c + ch for c in combos for ch in letters[d]]  # @viz extend
        return combos  # @viz return
