class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        int[][] rotated = new int[n][n]; // a second n × n grid // @viz init
        for (int i = 0; i < n; i++) // @viz copy
            for (int j = 0; j < n; j++) // @viz copy
                rotated[j][n - 1 - i] = matrix[i][j]; // row i becomes column n - 1 - i // @viz copy
        for (int i = 0; i < n; i++) // copy back: the caller's matrix has to hold the answer // @viz back
            System.arraycopy(rotated[i], 0, matrix[i], 0, n); // @viz back
    }
}
