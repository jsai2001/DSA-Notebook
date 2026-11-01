class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) // 1. transpose: flip over the main diagonal // @viz transpose
            for (int j = i + 1; j < n; j++) { // only above the diagonal, or every pair swaps twice // @viz transpose
                int t = matrix[i][j]; // @viz transpose
                matrix[i][j] = matrix[j][i]; // @viz transpose
                matrix[j][i] = t; // @viz transpose
            }
        for (int[] row : matrix) // 2. reverse each row: flip left to right // @viz reverse
            for (int l = 0, r = n - 1; l < r; l++, r--) { // @viz reverse
                int t = row[l]; // @viz reverse
                row[l] = row[r]; // @viz reverse
                row[r] = t; // @viz reverse
            }
    }
}
