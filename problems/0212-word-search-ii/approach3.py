class Solution(object):
    def findWords(self, board, words):
        root = {}  # a trie of all the words; node["$"] = the word that ends at that node  # @viz init
        for w in words:  # @viz init
            node = root  # @viz init
            for ch in w:  # @viz init
                node = node.setdefault(ch, {})  # @viz init
            node["$"] = w  # @viz init
        R, C = len(board), len(board[0])  # @viz init
        res = []  # @viz init
        def dfs(r, c, node):  # node = the trie node for the letters on the path so far  # @viz dfs
            ch = board[r][c]  # @viz dfs
            if ch not in node:  # no word goes on with this letter (or "#": already on the path)  # @viz stop
                return  # @viz stop
            nxt = node[ch]  # @viz step
            if "$" in nxt:  # the path spells a whole word  # @viz found
                res.append(nxt.pop("$"))  # pop it, so it's reported once  # @viz found
            board[r][c] = "#"  # @viz step
            for x, y in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):  # @viz step
                if 0 <= x < R and 0 <= y < C:  # @viz step
                    dfs(x, y, nxt)  # @viz step
            board[r][c] = ch  # @viz back
            if not nxt:  # nothing left below: every word through here is found  # @viz prune
                del node[ch]  # cut the branch, so no later path walks it again  # @viz prune
        for r in range(R):  # @viz start
            for c in range(C):  # @viz start
                dfs(r, c, root)  # @viz start
        return res  # @viz return
