class Solution(object):
    def partition(self, s):
        n = len(s)  # @viz table
        pal = [[False] * n for _ in range(n)]  # @viz table
        for i in range(n - 1, -1, -1):  # @viz table
            for j in range(i, n):  # @viz table
                pal[i][j] = s[i] == s[j] and (j - i < 2 or pal[i + 1][j - 1])  # @viz table
        # parts[i] = every way to split the suffix s[i:]. parts[n] has one way: no pieces.
        parts = [[] for _ in range(n + 1)]  # @viz init
        parts[n] = [[]]  # @viz init
        for i in range(n - 1, -1, -1):  # shortest suffix first  # @viz suffix
            for end in range(i, n):  # first piece = s[i..end]  # @viz try
                if pal[i][end]:  # @viz try
                    piece = s[i:end + 1]  # @viz join
                    for rest in parts[end + 1]:  # every way to split what's left  # @viz join
                        parts[i].append([piece] + rest)  # @viz join
        return parts[0]  # @viz return
