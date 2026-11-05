class Solution {
    private int R, C;
    public boolean exist(char[][] board, String word) {
        R = board.length; // @viz init
        C = board[0].length; // @viz init
        int[] have = new int[128]; // @viz count
        for (char[] row : board) // @viz count
            for (char ch : row) have[ch]++; // @viz count
        int[] need = new int[128]; // @viz count
        for (char ch : word.toCharArray()) // @viz count
            if (++need[ch] > have[ch]) return false; // the board doesn't have enough of this letter: no search at all // @viz count
        if (have[word.charAt(0)] > have[word.charAt(word.length() - 1)]) // start from the rarer end: fewer first cells to try // @viz flip
            word = new StringBuilder(word).reverse().toString(); // a path spells word exactly when, walked back, it spells the reverse // @viz flip
        for (int r = 0; r < R; r++) // try every cell as the first letter // @viz start
            for (int c = 0; c < C; c++) // @viz start
                if (dfs(board, word, r, c, 0)) return true; // @viz start, return
        return false; // @viz return
    }
    // Can word[k..] be spelled starting at (r, c)?
    private boolean dfs(char[][] board, String word, int r, int c, int k) { // @viz call
        if (k == word.length()) return true; // every letter matched // @viz found
        if (r < 0 || r >= R || c < 0 || c >= C || board[r][c] != word.charAt(k)) // @viz fail
            return false; // off the board or the wrong letter ('#' never matches) // @viz fail
        char letter = board[r][c]; // @viz take
        board[r][c] = '#'; // mark: this cell is on the path // @viz take
        boolean found = dfs(board, word, r + 1, c, k + 1) || dfs(board, word, r - 1, c, k + 1) || // @viz take
                        dfs(board, word, r, c + 1, k + 1) || dfs(board, word, r, c - 1, k + 1); // @viz take
        board[r][c] = letter; // put the letter back // @viz undo
        return found; // @viz undo
    }
}
