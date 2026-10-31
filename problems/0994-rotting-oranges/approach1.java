import java.util.ArrayList;
import java.util.List;

class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length, cols = grid[0].length; // @viz init
        int minutes = 0; // @viz init
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};
        while (true) { // @viz minute
            // Find every fresh orange next to a rotten one, using this minute's grid only.
            List<int[]> toRot = new ArrayList<>(); // @viz scan
            for (int r = 0; r < rows; r++) { // @viz scan
                for (int c = 0; c < cols; c++) { // @viz scan
                    if (grid[r][c] != 1) continue; // @viz scan
                    for (int k = 0; k < 4; k++) { // @viz scan
                        int nr = r + dr[k], nc = c + dc[k];
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 2) { // @viz scan
                            toRot.add(new int[] {r, c}); // @viz found
                            break;
                        }
                    }
                }
            }
            if (toRot.isEmpty()) break; // @viz stop
            for (int[] cell : toRot) grid[cell[0]][cell[1]] = 2; // rot them all at once, after the scan // @viz rot
            minutes++; // @viz rot
        }
        // Anything still fresh can never be reached.
        for (int[] row : grid) // @viz check
            for (int v : row) // @viz check
                if (v == 1) return -1; // @viz check
        return minutes; // @viz return
    }
}
