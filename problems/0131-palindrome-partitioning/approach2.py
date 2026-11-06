class Solution(object):
    def partition(self, s):
        n = len(s)  # @viz table
        # pal[i][j]: is s[i..j] a palindrome? Built from short pieces to long ones.
        pal = [[False] * n for _ in range(n)]  # @viz table
        for i in range(n - 1, -1, -1):  # @viz table
            for j in range(i, n):  # @viz table
                pal[i][j] = s[i] == s[j] and (j - i < 2 or pal[i + 1][j - 1])  # @viz table
        result, path = [], []  # @viz init

        def backtrack(start):
            if start == n:  # @viz done
                result.append(path[:])  # a copy: path keeps changing  # @viz done
                return  # @viz done
            for end in range(start, n):  # @viz try
                if pal[start][end]:  # O(1): look it up  # @viz try
                    path.append(s[start:end + 1])  # choose  # @viz choose
                    backtrack(end + 1)  # explore the rest  # @viz choose
                    path.pop()  # undo  # @viz undo

        backtrack(0)  # @viz init
        return result  # @viz return
