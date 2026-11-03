class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length; // @viz init
        boolean[] zeroRows = new boolean[m], zeroCols = new boolean[n]; // @viz init
        for (int i = 0; i < m; i++) { // pass 1: only remember where the zeros are // @viz mark
            for (int j = 0; j < n; j++) { // @viz mark
                if (matrix[i][j] == 0) zeroRows[i] = zeroCols[j] = true; // @viz mark
            }
        }
        for (int i = 0; i < m; i++) { // pass 2: zero every cell in a marked row or column // @viz fill
            for (int j = 0; j < n; j++) { // @viz fill
                if (zeroRows[i] || zeroCols[j]) matrix[i][j] = 0; // @viz fill
            }
        }
    }
}
