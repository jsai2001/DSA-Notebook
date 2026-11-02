import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    private int n;
    private List<List<String>> result;
    private int[] cols; // cols[r]: column of the queen in row r
    private boolean[] used; // one queen per column
    public List<List<String>> solveNQueens(int n) {
        this.n = n; // @viz init
        result = new ArrayList<>(); // @viz init
        cols = new int[n]; // @viz init
        used = new boolean[n]; // @viz init
        place(0); // @viz init
        return result; // @viz return
    }
    private void place(int r) { // @viz call
        if (r == n) { // a queen in every row and column: only now look at diagonals // @viz full
            if (noDiagonalAttacks()) result.add(board()); // @viz check, keep
            return; // @viz full
        }
        for (int c = 0; c < n; c++) { // @viz try
            if (used[c]) continue; // @viz try
            used[c] = true; // @viz try
            cols[r] = c; // @viz try
            place(r + 1); // @viz try
            used[c] = false; // undo (cols[r] is overwritten next time) // @viz undo
        }
    }
    private boolean noDiagonalAttacks() {
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (Math.abs(cols[i] - cols[j]) == j - i) return false; // rows apart == columns apart: same diagonal
        return true;
    }
    private List<String> board() {
        List<String> rows = new ArrayList<>();
        for (int r = 0; r < n; r++) {
            char[] row = new char[n];
            Arrays.fill(row, '.');
            row[cols[r]] = 'Q';
            rows.add(new String(row));
        }
        return rows;
    }
}
