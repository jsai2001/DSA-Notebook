from collections import Counter
class Solution(object):
    def exist(self, board, word):
        R, C = len(board), len(board[0])  # @viz init
        have = Counter(ch for row in board for ch in row)  # @viz count
        if any(have[ch] < k for ch, k in Counter(word).items()):  # @viz count
            return False  # the board doesn't have enough of some letter: no search at all  # @viz count
        if have[word[0]] > have[word[-1]]:  # start from the rarer end: fewer first cells to try  # @viz flip
            word = word[::-1]  # a path spells word exactly when, walked back, it spells the reverse  # @viz flip
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
