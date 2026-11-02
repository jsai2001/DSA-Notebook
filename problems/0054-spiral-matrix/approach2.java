import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        int top = 0, bottom = matrix.length - 1; // the rows and columns not taken yet // @viz init
        int left = 0, right = matrix[0].length - 1; // @viz init
        List<Integer> result = new ArrayList<>(); // @viz init
        while (top <= bottom && left <= right) { // one ring per round // @viz ring
            for (int c = left; c <= right; c++) result.add(matrix[top][c]); // top row, left to right // @viz top
            top++; // @viz top
            for (int r = top; r <= bottom; r++) result.add(matrix[r][right]); // right column, top to bottom // @viz right
            right--; // @viz right
            if (top <= bottom) { // a row is still left (not the one just taken) // @viz bottom
                for (int c = right; c >= left; c--) result.add(matrix[bottom][c]); // bottom row, right to left // @viz bottom
                bottom--; // @viz bottom
            }
            if (left <= right) { // a column is still left // @viz left
                for (int r = bottom; r >= top; r--) result.add(matrix[r][left]); // left column, bottom to top // @viz left
                left++; // @viz left
            }
        }
        return result; // @viz return
    }
}
