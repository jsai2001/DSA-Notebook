class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Read row by row, the matrix is one sorted list of m * n numbers.
        int m = matrix.length, n = matrix[0].length; // @viz init
        int lo = 0, hi = m * n - 1; // positions in that list // @viz init
        while (lo <= hi) { // @viz loop
            int mid = lo + (hi - lo) / 2; // @viz loop
            int value = matrix[mid / n][mid % n]; // position -> (row, column): divide by the row length n // @viz loop
            if (value == target) { // @viz found
                return true; // @viz found
            }
            if (value < target) { // @viz right
                lo = mid + 1; // the target is after mid // @viz right
            } else { // @viz left
                hi = mid - 1; // the target is before mid // @viz left
            }
        }
        return false; // @viz return
    }
}
