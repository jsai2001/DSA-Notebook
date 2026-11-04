class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        for (int[] row : matrix) { // @viz row
            for (int value : row) { // look at every cell // @viz cell
                if (value == target) { // @viz cell
                    return true; // @viz found
                }
            }
        }
        return false; // @viz return
    }
}
