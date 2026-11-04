import java.util.Arrays;
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Find the last row whose first value is <= target (Java has no binary search by a key for this).
        int lo = 0, hi = matrix.length - 1, r = -1;
        while (lo <= hi) {
            int mid = (lo + hi) >>> 1;
            if (matrix[mid][0] <= target) { r = mid; lo = mid + 1; } else hi = mid - 1;
        }
        // Arrays.binarySearch returns a negative number when the value isn't there
        return r >= 0 && Arrays.binarySearch(matrix[r], target) >= 0;
    }
}
