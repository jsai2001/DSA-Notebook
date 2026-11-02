import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    private int n;
    private List<List<String>> result;
    private char[][] board;
    private boolean[] usedCol, usedDiag, usedAnti;
    public List<List<String>> solveNQueens(int n) {
        this.n = n; // @viz init
        result = new ArrayList<>(); // @viz init
        board = new char[n][n]; // @viz init
        for (char[] row : board) Arrays.fill(row, '.'); // @viz init
        usedCol = new boolean[n]; // @viz init
        usedDiag = new boolean[2 * n - 1]; // r - c runs from -(n-1) to n-1: stored at r - c + n - 1 // @viz init
        usedAnti = new boolean[2 * n - 1]; // r + c runs from 0 to 2n-2 // @viz init
        place(0); // @viz init
        return result; // @viz return
    }
    private void place(int r) { // @viz call
        if (r == n) { // a queen in every row, none attacking another // @viz done
            List<String> rows = new ArrayList<>(); // @viz done
            for (char[] row : board) rows.add(new String(row)); // copy: board keeps changing // @viz done
            result.add(rows); // @viz done
            return; // @viz done
        }
        for (int c = 0; c < n; c++) { // @viz try
            if (usedCol[c] || usedDiag[r - c + n - 1] || usedAnti[r + c]) continue; // attacked: skip // @viz attacked
            usedCol[c] = usedDiag[r - c + n - 1] = usedAnti[r + c] = true; // @viz place
            board[r][c] = 'Q'; // @viz place
            place(r + 1); // @viz place
            board[r][c] = '.'; // undo, so the next column can be tried // @viz undo
            usedCol[c] = usedDiag[r - c + n - 1] = usedAnti[r + c] = false; // @viz undo
        }
    }
}
