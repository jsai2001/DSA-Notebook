class Solution(object):
    def letterCombinations(self, digits):
        if not digits:  # no digits: no combinations (not [""])  # @viz empty
            return []  # @viz empty
        letters = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl",  # @viz init
                   "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}  # @viz init
        result, path = [], []  # @viz init

        def backtrack(i):  # pick a letter for digits[i]  # @viz call
            if i == len(digits):  # one letter picked for every digit  # @viz done
                result.append("".join(path))  # @viz done
                return  # @viz done
            for ch in letters[digits[i]]:  # @viz choose
                path.append(ch)  # @viz choose
                backtrack(i + 1)  # @viz choose
                path.pop()  # undo, so the next letter can take its place  # @viz undo

        backtrack(0)  # @viz start
        return result  # @viz return
