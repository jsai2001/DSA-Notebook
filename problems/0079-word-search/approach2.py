class Solution(object):
    def exist(self, board, word):
        R, C = len(board), len(board[0])  # @viz init
        def dfs(r, c, k):  # can word[k:] be spelled starting at (r, c)?  # @viz call
            if k == len(word):  # every letter matched  # @viz found
                return True  # @viz found
            if r < 0 or r >= R or c < 0 or c >= C or board[r][c] != word[k]:  # @viz fail
                return False  # off the board or the wrong letter ("#" never matches)  # @viz fail
            letter, board[r][c] = board[r][c], "#"  # mark: this cell is on the path  # @viz take
            found = (dfs(r + 1, c, k + 1) or dfs(r - 1, c, k + 1) or  # @viz take
                     dfs(r, c + 1, k + 1) or dfs(r, c - 1, k + 1))  # @viz take
            board[r][c] = letter  # put the letter back  # @viz undo
            return found  # @viz undo
        for r in range(R):  # try every cell as the first letter  # @viz start
            for c in range(C):  # @viz start
                if dfs(r, c, 0):  # @viz start
                    return True  # @viz return
        return False  # @viz return
