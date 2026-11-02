import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    private int n, full;
    private List<List<String>> result;
    private int[] cols; // cols[r]: column of the queen in row r
    public List<List<String>> solveNQueens(int n) {
        this.n = n; // @viz init
        result = new ArrayList<>(); // @viz init
        cols = new int[n]; // @viz init
        full = (1 << n) - 1; // n one-bits: bit c stands for column c // @viz init
        place(0, 0, 0, 0); // @viz init
        return result; // @viz return
    }
    private void place(int r, int colMask, int diagMask, int antiMask) { // bits set = columns attacked in this row // @viz call
        if (colMask == full) { // every column has a queen: every row does too // @viz done
            List<String> rows = new ArrayList<>(); // @viz done
            for (int c : cols) { // @viz done
                char[] row = new char[n]; // @viz done
                Arrays.fill(row, '.'); // @viz done
                row[c] = 'Q'; // @viz done
                rows.add(new String(row)); // @viz done
            }
            result.add(rows); // @viz done
            return; // @viz done
        }
        int free = full & ~(colMask | diagMask | antiMask); // columns that are safe in this row // @viz free
        while (free != 0) { // @viz pick
            int bit = free & -free; // the lowest safe column // @viz pick
            free -= bit; // @viz pick
            cols[r] = Integer.numberOfTrailingZeros(bit); // index of that bit = the column // @viz pick
            // one row down, a down-right attack moves one column right (<< 1), a down-left one left (>> 1)
            place(r + 1, colMask | bit, ((diagMask | bit) << 1) & full, (antiMask | bit) >> 1); // @viz pick
        }
        // (no explicit undo: cols[r] is overwritten by the next pick) // @viz undo
    }
}
