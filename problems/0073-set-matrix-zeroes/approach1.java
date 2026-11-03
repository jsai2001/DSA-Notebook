class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length; // @viz copy
        int[][] original = new int[m][]; // find the zeros here, so new zeros don't spread // @viz copy
        for (int i = 0; i < m; i++) original[i] = matrix[i].clone(); // @viz copy
        for (int i = 0; i < m; i++) { // @viz scan
            for (int j = 0; j < n; j++) { // @viz scan
                if (original[i][j] == 0) { // @viz scan
                    for (int c = 0; c < n; c++) matrix[i][c] = 0; // wipe its row // @viz wipe
                    for (int r = 0; r < m; r++) matrix[r][j] = 0; // and its column // @viz wipe
                }
            }
        }
    }
}
