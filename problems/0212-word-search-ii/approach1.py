class Solution(object):
    def findWords(self, board, words):
        R, C = len(board), len(board[0])  # @viz init
        def match(r, c, word, i):  # does word[i:] start at (r, c)?  # @viz match
            if board[r][c] != word[i]:  # wrong letter, or "#" = already on the path  # @viz match
                return False  # @viz match
            if i == len(word) - 1:  # the last letter matched  # @viz match
                return True  # @viz match
            board[r][c] = "#"  # mark the cell as used on this path  # @viz match
            found = any(0 <= x < R and 0 <= y < C and match(x, y, word, i + 1) for x, y in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)))  # @viz match
            board[r][c] = word[i]  # unmark it on the way back  # @viz match
            return found  # @viz match
        res = []  # @viz init
        for word in words:  # search the whole board again for every word  # @viz word
            if any(match(r, c, word, 0) for r in range(R) for c in range(C)):  # @viz word
                res.append(word)  # @viz found
        return res  # @viz return
