class Solution(object):
    def partition(self, s):
        result, path = [], []  # @viz init

        def is_pal(lo, hi):  # two pointers, every time it's asked  # @viz check
            while lo < hi:  # @viz check
                if s[lo] != s[hi]:  # @viz check
                    return False  # @viz check
                lo += 1  # @viz check
                hi -= 1  # @viz check
            return True  # @viz check

        def backtrack(start):
            if start == len(s):  # every letter is in some piece  # @viz done
                result.append(path[:])  # a copy: path keeps changing  # @viz done
                return  # @viz done
            for end in range(start, len(s)):  # next piece = s[start..end]  # @viz try
                if is_pal(start, end):  # @viz try
                    path.append(s[start:end + 1])  # choose  # @viz choose
                    backtrack(end + 1)  # explore the rest  # @viz choose
                    path.pop()  # undo  # @viz undo

        backtrack(0)  # @viz init
        return result  # @viz return
