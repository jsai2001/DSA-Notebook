class Solution(object):
    def exist(self, board, word):
        R, C = len(board), len(board[0])  # @viz init
        seen = [[False] * C for _ in range(R)]  # cells on the current path  # @viz init
        def dfs(r, c, k):  # can word[k:] be spelled starting at (r, c)?  # @viz call
            if k == len(word):  # every letter matched  # @viz found
                return True  # @viz found
            if r < 0 or r >= R or c < 0 or c >= C or seen[r][c] or board[r][c] != word[k]:  # @viz fail
                return False  # off the board, already used, or the wrong letter  # @viz fail
            seen[r][c] = True  # @viz take
            found = (dfs(r + 1, c, k + 1) or dfs(r - 1, c, k + 1) or  # @viz take
                     dfs(r, c + 1, k + 1) or dfs(r, c - 1, k + 1))  # @viz take
            seen[r][c] = False  # undo: other paths may use this cell  # @viz undo
            return found  # @viz undo
        for r in range(R):  # try every cell as the first letter  # @viz start
            for c in range(C):  # @viz start
                if dfs(r, c, 0):  # @viz start
                    return True  # @viz return
        return False  # @viz return
