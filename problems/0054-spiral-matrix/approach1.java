import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean[][] seen = new boolean[m][n]; // @viz init
        int[] dr = {0, 1, 0, -1}, dc = {1, 0, -1, 0}; // right, down, left, up // @viz init
        int r = 0, c = 0, d = 0; // @viz init
        List<Integer> result = new ArrayList<>(); // @viz init
        for (int k = 0; k < m * n; k++) { // every cell exactly once // @viz take
            result.add(matrix[r][c]); // @viz take
            seen[r][c] = true; // @viz take
            int nr = r + dr[d], nc = c + dc[d]; // the next cell in this direction // @viz look
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) { // off the edge, or already taken: turn right // @viz turn
                d = (d + 1) % 4; // @viz turn
                nr = r + dr[d]; // @viz turn
                nc = c + dc[d]; // @viz turn
            }
            r = nr; // @viz look
            c = nc; // @viz look
        }
        return result; // @viz return
    }
}
