import java.util.Arrays;
class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n]; // @viz init
        Arrays.fill(row, 1); // the top row: one way to reach each of its cells // @viz init
        for (int r = 1; r < m; r++) { // every row below it // @viz row
            for (int c = 1; c < n; c++) { // column 0 stays 1 // @viz cell
                row[c] += row[c - 1]; // row[c] still holds the cell above; row[c - 1] is the cell to the left // @viz cell
            }
        }
        return row[n - 1]; // @viz answer
    }
}
