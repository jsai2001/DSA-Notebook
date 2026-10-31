from itertools import product


class Solution(object):
    def letterCombinations(self, digits):
        if not digits:  # product() of nothing gives one empty tuple, which would be [""]
            return []
        letters = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl",
                   "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}
        return ["".join(p) for p in product(*(letters[d] for d in digits))]
